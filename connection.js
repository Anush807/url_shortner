const mongoose = require("mongoose");

async function handleDatabaseConnection(url) {
    await mongoose.connect(url);
}

module.exports =  handleDatabaseConnection ;