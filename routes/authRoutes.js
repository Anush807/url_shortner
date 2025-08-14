const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/authController");
const { signUpController }  = require("../controllers/signupcontroller")

router.post("/signup", signUpController);
router.post("/signin", authController);

module.exports = router;