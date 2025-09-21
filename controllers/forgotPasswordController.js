const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
const userdb = require("../model/authSchema");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const forgotPasswordController = async (req, res) =>{
    try{
        const { email } = req.body;

        if(!email){
             return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
        }

        const user = await userdb.findOne({
            email: email
        }) 

         if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.'
      });
    }
      // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

     // Hash the token before saving to database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save reset token to user document
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save(); 
    
    // Create reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email HTML template
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #fff; }
            .button { 
              display: inline-block; 
              background-color: #007cba; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { font-size: 12px; color: #666; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Password Reset Request</h2>
            </div>
            <div class="content">
              <p>Hello ${user.userName || user.email},</p>
              <p>You requested to reset your password. Click the button below to reset it:</p>
              <p style="text-align: center;">
                <a href="${resetURL}" class="button">Reset Password</a>
              </p>
              <p>Or copy and paste this link in your browser:</p>
              <p><a href="${resetURL}">${resetURL}</a></p>
              <p>This link will expire in 10 minutes.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    //send email
    await transporter.sendMail(mailOptions);
      res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully'
    });
    

    }catch(error){
         // Clear reset token if email sending fails
    if (error.user) {
      error.user.passwordResetToken = undefined;
      error.user.passwordResetExpires = undefined;
      await error.user.save({ validateBeforeSave: false });
    }

    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending password reset email',
    //error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    }
}


/**
 * Reset password with token
 * POST /api/auth/reset-password/:token
 */


const resetPassword = async (req, res) =>{
    try{
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
            // Validate input
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password and confirm password are required'
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }
       if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash the token to compare with stored hash (try crypto first, fallback to argon2)
    let hashedToken;
    let useCryptoMethod = true;
     try {
      if (crypto && crypto.createHash) {
        hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      } else {
        throw new Error('Crypto not available');
      }
    } catch (cryptoError) {
      useCryptoMethod = false;
      console.log('Using argon2 comparison method');
    }
    let user;
    if (useCryptoMethod && hashedToken){
         user = userdb.findOne({
             passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
        })
    }
    else{
         const users = await Auth.find({
        passwordResetToken: { $exists: true, $ne: null },
        passwordResetExpires: { $gt: Date.now() }
      });
       for (let potentialUser of users) {
        try {
          const isMatch = await argon2.verify(potentialUser.passwordResetToken, token);
          if (isMatch) {
            user = potentialUser;
            break;
          }
        } catch (verifyError) {
          console.log('Token verification error:', verifyError.message);
          continue;
        }
      }
    }
      if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
      // Update user password (Argon2 hashing will be handled by the pre-save middleware)
    user.password = password; // The pre-save hook will hash this with Argon2
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
     await user.save();

      res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
    }catch(error){
         console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
    //error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    }

}


/**
 * Verify reset token (optional - for frontend validation)
 * GET /api/auth/verify-reset-token/:token
 */
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    
    let hashedToken;
    let useCryptoMethod = true;
    
    try {
      if (crypto && crypto.createHash) {
        hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      } else {
        throw new Error('Crypto not available');
      }
    } catch (cryptoError) {
      useCryptoMethod = false;
    }
    
    let user;
    if (useCryptoMethod && hashedToken) {
      user = await Auth.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });
    } else {
      // Using argon2 method
      const users = await Auth.find({
        passwordResetToken: { $exists: true, $ne: null },
        passwordResetExpires: { $gt: Date.now() }
      });
      
      for (let potentialUser of users) {
        try {
          const isMatch = await argon2.verify(potentialUser.passwordResetToken, token);
          if (isMatch) {
            user = potentialUser;
            break;
          }
        } catch (verifyError) {
          continue;
        }
      }
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      email: user.email,
      userName: user.userName
    });

  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token'
    });
  }
};

module.exports = {
    forgotPasswordController,
    resetPassword,
    verifyResetToken
}   