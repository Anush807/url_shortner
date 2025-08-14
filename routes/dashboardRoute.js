const express = require("express");
const verifyToken = require("../middleware/authMiddleware")
const { userInformationController } = require("../controllers/userInformationController")
const router = express.Router();

router.get("/user-information", verifyToken, userInformationController);

module.exports = router

