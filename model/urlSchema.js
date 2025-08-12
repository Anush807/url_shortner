const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    userName: {
        type: String,
         required: true,

    },
    password:{
        type: String,
         required: true,
    }
})

const urlSchema = new mongoose.Schema({
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
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