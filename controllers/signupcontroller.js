// const { signUpSchema } = require("../validations/confirmPassword");
// const userAuth = require("../model/authSchema");
// const argon2 = require("argon2");

// async function hashPassword(password) {
//   return argon2.hash(password);
// }

// const signUpController = async (req, res) => {
//   try {
//     const { email, password, confirmPassword } = req.body;

//     // Validate input
//     const result = signUpSchema.safeParse({ email, password, confirmPassword });
//     if (!result.success) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: result.error.errors,
//       });
//     }

//     // Check for existing user
//     const existingUser = await userAuth.findOne({ email: result.data.email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     console.log(password);
//     const hashedPassword = await hashPassword(password);
//     console.log(hashedPassword);

//   const generatedUserName = email.split("@")[0].substring(0, 10);

// const user = await userAuth.create({
//   email: result.data.email,
//   password: hashedPassword,
//   userName: generatedUserName,
// });


//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user: {
//         id: user._id,
//         email: user.email,
//          // auto-generated
//       },
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error 1",
//     });
//   }
// };

// module.exports = {
//   signUpController,
// };
