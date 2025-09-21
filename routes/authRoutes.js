// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const { authController } = require("../controllers/authController");
// const { signUpController }  = require("../controllers/signupcontroller");
// const { forgotPasswordController, verifyResetToken, resetPassword } = require("../controllers/forgotPasswordController")

// const validateEmail = [
//   body('email')
//     .isEmail()
//     .normalizeEmail()
//     .withMessage('Please provide a valid email'),
// ];

// const validatePasswordReset = [
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//     .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
//   body('confirmPassword')
//     .custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error('Passwords do not match');
//       }
//       return true;
//     })
// ];

// // Handle validation errors
// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       message: 'Validation failed',
//       errors: errors.array()
//     });
//   }
//   next();
// };



// router.post('/forgot-password', validateEmail, handleValidationErrors, forgotPasswordController);
// router.post('/reset-password/:token', validatePasswordReset, handleValidationErrors, resetPassword);
// router.get('/verify-reset-token/:token', verifyResetToken);
// router.post("/signup", signUpController);
// router.post("/signin", authController);

// module.exports = router;