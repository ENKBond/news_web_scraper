const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// Set Handlebars.
const exphbs = require("express-handlebars");

const axios = require("axios");
const cheerio = require("cheerio");

 db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//routes
require("./routes/api")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
