const express = require("express");
const verifyToken = require("../middleware/authMiddleware")
const { userInformationController } = require("../controllers/userInformationController")
const { generateurlController } = require("../controllers/generateurlController")
const { redirectController } = require("../controllers/redirectController")
const router = express.Router();

router.get("/user-information", verifyToken, userInformationController);
router.post("/generatelink", verifyToken, generateurlController)


module.exports = router

