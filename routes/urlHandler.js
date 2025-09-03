const express = require("express");
const router = express.Router();
const { handleShorturl } = require("../controllers/shortUrlController");
const { handleUrl } = require("../controllers/urlController");
const { redirectController } = require("../controllers/redirectController")

router.post("/url", handleUrl);
router.get("/:shorturl", handleShorturl);


module.exports = router;
