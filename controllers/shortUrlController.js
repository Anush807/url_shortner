const URL = require("../model/urlSchema");



const handleShorturl = async (req, res) => {
    const shorturl = req.params.shorturl;
    const redirectingurl = await URL.findOne({
        shorturl: shorturl
    })   
    const url = redirectingurl.originalUrl;

    res.redirect(url);
}

module.exports = {  
    handleShorturl
}