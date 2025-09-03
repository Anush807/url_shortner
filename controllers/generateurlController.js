const shortid = require("shortid");
const userAuth = require("../model/authSchema");

const generateurlController = async (req, res) => {
    try{
    const username = req.user.userName;
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
           message: "No url found"
    });
    }
    const shortUrl = shortid();
    const user = await userAuth.findOne({ userName: username });

    user.urls.push({
      originalUrl: body.url,
      shorturl: shortUrl,
    });
     await user.save();

      return res.status(201).json({
      message: "Short URL generated",
      shortUrl,
    });
}catch(err){
     console.error(err);
    return res.status(500).json({ message: "Server error" });
}
  
}





module.exports = {
   generateurlController
}