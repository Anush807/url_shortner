
const userAuth = require("../model/authSchema")

const redirectController = async (req, res) => {
  try {
    console.log("redirecting");
    const { shorturl } = req.params
    const user = await userAuth.findOne({ "urls.shorturl": shorturl });
    if (!user) {
      return res.status(404).json({ message: "Short URL not found" });
    }
 // Find the specific url object in the user's urls[]
    const urlObj = user.urls.find((u) => u.shorturl === shorturl);
    if (!urlObj) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    // Increment clicks and update lastClickedAt
    urlObj.clicks += 1;
    urlObj.lastClickedAt = new Date();
    await user.save();
    // Redirect to the original URL
   return res.redirect(urlObj.originalUrl);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = {
  redirectController
}