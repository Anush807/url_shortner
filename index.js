const express = require("express");
require("dotenv").config();
const  handleDatabaseConnection  = require("./connection");
const app = express();
const PORT = process.env.PORT;
const url = require("./routes/urlHandler"); 

handleDatabaseConnection("mongodb+srv://anushpoojary0101:Anush8073@cluster0.uxmka.mongodb.net/url-shortner");
app.use(express.json());

app.use("/", url);

app.listen(PORT,() => {
    console.log("app is listening on port " + PORT);
});