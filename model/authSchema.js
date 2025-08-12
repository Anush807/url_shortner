const mongoose = require("mongoose");

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
    }
}, { timestamps: true });


const auth = mongoose.model("auth", authSchema);
module.exports = auth;