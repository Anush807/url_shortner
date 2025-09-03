const URL = require("../model/urlSchema");

const handleShorturl = async (req, res) => {
    const shorturl = req.params.shorturl;
    const redirectingurl = await URL.findOne({
        shorturl: shorturl
    })   
     if (!redirectingurl) return res.status(404).send("Not found");
        redirectingurl.clicks += 1;
        const url = redirectingurl.originalUrl;
        res.redirect(url);
    }
module.exports = {  
    handleShorturl
}