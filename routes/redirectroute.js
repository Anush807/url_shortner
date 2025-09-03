// routes/redirectRoutes.js
const express = require("express");
const router = express.Router();
const { redirectController } = require("../controllers/redirectController");
router.get("/:shorturl", redirectController);
module.exports = router;
