const express = require("express");
const router = express.Router();
const { handleShorturl } = require("../controllers/shortUrlController");
const { handleUrl } = require("../controllers/urlController");


router.post("/url", handleUrl);
router.get("/:shorturl", handleShorturl);


module.exports = router;
