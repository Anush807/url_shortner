const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shorturl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
     urls: [urlSchema], 

}, { timestamps: true });


const auth = mongoose.model("auth", authSchema);
module.exports = auth;