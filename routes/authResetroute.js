const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const Auth = require("../model/authSchema"); 

const router = express.Router();

// Rate limit to avoid abuse
const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many password reset requests from this IP, please try later."
});

// configure transporter via env vars (SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // e.g. smtp.sendgrid.net or smtp.gmail.com
  port: process.env.EMAIL_PORT,         // usually 587 (STARTTLS) or 465
  secure: process.env.EMAIL_SECURE === "true", // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// 1) Request a password reset link
// Accepts { email } or { userName } in body
router.post("/request-password-change", requestLimiter, async (req, res) => {
  try {
    const { email, userName } = req.body;
    if (!email && !userName) return res.status(400).json({ message: "Provide email or userName." });

    const user = email ? await Auth.findOne({ email }) : await Auth.findOne({ userName });
    if (!user || !user.email) {
      // don't reveal which one failed — generic message is better for security
      return res.status(200).json({ message: "If an account exists we have sent an email with reset instructions." });
    }

    // generate token (raw token is sent via email)
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Reset URL points to frontend page that reads token + id query params
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user._id}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: "Password reset for your account",
      html: `
        <p>You requested a password reset. Click the link below to set a new password. This link expires in 15 minutes.</p>
        <p><a href="${resetUrl}">Reset your password</a></p>
        <p>If you did not request this, ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "If an account exists we have sent an email with reset instructions." });
  } catch (err) {
    console.error("request-password-change error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});


// 2) Reset password using token
// Accepts { id, token, newPassword }
router.post("/reset-password", async (req, res) => {
  try {
    const { id, token, newPassword } = req.body;
    if (!id || !token || !newPassword) return res.status(400).json({ message: "Invalid request." });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await Auth.findOne({
      _id: id,
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    // set new password (pre save hook will hash via Argon2)
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Optionally: invalidate all sessions / tokens for the user here

    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("reset-password error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;