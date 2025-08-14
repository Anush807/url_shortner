const express = require("express");
require("dotenv").config();
const  handleDatabaseConnection  = require("./connection");
const app = express();
const PORT = process.env.PORT;
const url = require("./routes/urlHandler"); 
const auth = require("./routes/authRoutes");
const dashboard = require("./routes/dashboardRoute")
const cors = require("cors");
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;


app.use(cors({
  origin: FRONTEND_URI, // or use "*" to allow all origins (not recommended for production)
  credentials: true               // if you're using cookies or sessions
}));


handleDatabaseConnection(MONGO_URI);
app.use(express.json());

app.use("/", url);
app.use("/auth", auth);
app.use("/dashboard", dashboard)


app.listen(PORT,() => {
    console.log("app is listening on port " + PORT);
});