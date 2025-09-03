const { authZodSchema } = require("../validations/auth");
const userAuth = require("../model/authSchema");
const jwt = require("jsonwebtoken");
const argon2 = require('argon2');



const authController = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const parsedData = authZodSchema.safeParse({ userName, password });

        if (!parsedData.success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const user = await userAuth.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const dbpassword = user.password;

        async function verifyPassword(dbpassword, password) {
  try {
    const match = await argon2.verify(dbpassword, password);
    return match; // true or false
  } catch (err) {
    console.error(err);
  }
}

        if (!verifyPassword(dbpassword, password)) {
            return res.status(401).json({ message: "Invalid password" });
        }

        console.log("logged in successfully");

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "signin successful",
            token
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    authController
};
