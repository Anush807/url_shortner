const { authZodSchema } = require("../validations/auth");
const userAuth = require("../model/authSchema");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const authController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validate input
    const parsedData = authZodSchema.safeParse({ email, password });
    if (!parsedData.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    console.log()

    // check if user exists
    const user = await userAuth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // verify password
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("logged in successfully");

    // create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "signin successful",
      token,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  authController,
};
