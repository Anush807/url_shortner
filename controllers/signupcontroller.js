const { signUpSchema } = require("../validations/confirmPassword");
const userAuth = require("../model/authSchema");

const signUpController = async (req, res) => {
   try {
       const { userName, password, confirmPassword } = req.body;
       
       const result = signUpSchema.safeParse({ userName, password, confirmPassword });
       
       if (!result.success) {
           return res.status(400).json({
               success: false,
               message: "Validation failed",
               errors: result.error.errors
           });
       }
       
       const existingUser = await userAuth.findOne({ userName: result.data.userName });
       
       if (existingUser) {
           return res.status(400).json({
               success: false,
               message: "User already exists"
           });
       }
       
       const user = await userAuth.create({
           userName: result.data.userName,
           password: result.data.password
       });

       res.status(201).json({
           success: true,
           message: "User created successfully",
           user: {
               id: user._id,
               userName: user.userName
           }
       });

   } catch (err) {
       console.error("Error:", err);
       res.status(500).json({
           success: false,
           message: "Internal server error"
       });
   }
};

module.exports = {
   signUpController
};