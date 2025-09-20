const mongoose = require("mongoose");

async function handleDatabaseConnection(url) {
try {

    await mongoose.connect(url,
        {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              maxPoolSize: 20,  // maximum connections in the pool
              minPoolSize: 5,
              serverSelectionTimeoutMS: 5000,
        }
    );
     console.log("MongoDB connected with connection pooling!");
}catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // exit process if DB connection fails
  }
}

module.exports =  handleDatabaseConnection ;