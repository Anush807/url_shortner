const express = require("express");
require("dotenv").config();
const  handleDatabaseConnection  = require("./connection");
const app = express();
const PORT = process.env.PORT;
const url = require("./routes/urlHandler"); 
const  redirectroute  = require("./routes/redirectroute")
const cors = require("cors");
const helmet = require("helmet");
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

app.use(helmet());
app.use(cors({
  origin: FRONTEND_URI || "http://localhost:5173", // or use "*" to allow all origins (not recommended for production)
  credentials: true               // if you're using cookies or sessions
}));

handleDatabaseConnection(MONGO_URI);
app.use(express.json());

app.use("/", url);



app.listen(PORT,() => {
    console.log("app is listening on port " + PORT);
});