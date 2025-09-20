const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shorturl: {
    type: String,
    required: true,        // ensures every document has a shorturl
    unique: true,          // enforces uniqueness at DB level
    trim: true
  },
  originalUrl: {
    type: String,
    required: true
  }
});



const urlScheme = mongoose.model("url", urlSchema);

module.exports = urlScheme