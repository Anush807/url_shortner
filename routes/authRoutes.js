const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/authController");
const { signUpController }  = require("../controllers/signupcontroller");
const { forgotPasswordController } = require("../controllers/forgotPasswordController")


router.post("/signup", signUpController);
router.post("/signin", authController);
router.put("/forgotpassword", forgotPasswordController);

module.exports = router;