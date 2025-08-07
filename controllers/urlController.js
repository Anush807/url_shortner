const shortid = require("shortid");
const URL = require("../model/urlSchema");

const handleUrl = async (req, res) => {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
           message: "No url found"
    });
    }
    const shortUrl = shortid();
    await URL.create({
        originalUrl: body.url,
        shorturl: shortUrl,
    })
    console.log({
    message: shortUrl
})

res.json({
    message: shortUrl
})
}

module.exports = {
    handleUrl
}