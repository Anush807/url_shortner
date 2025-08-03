const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true,

    },

    shorturl:{
        type: String,
        required: true,
        unique: true
    }
})


const urlScheme = mongoose.model("url", urlSchema);

module.exports = urlScheme