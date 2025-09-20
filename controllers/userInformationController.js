const User = require("../model/authSchema");

const userInformationController = async (req, res) => {
  try {
    const userEmail = req.user.email; // comes from JWT
    const name = userEmail.split("@")[0];

    // Get the user from DB
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Total click count across all URLs
    const totalClicks = user.urls.reduce((sum, url) => sum + (url.clicks || 0), 0);

    // Prepare urls data with createdAt and clicks
    const urlsInfo = user.urls.map((url) => ({
      shorturl: url.shorturl,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastClickedAt: url.lastClickedAt || null,
    }));

    res.json({
      message: name,
      email: user.userName,
      totalClicks,
      urls: urlsInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  userInformationController,
};
