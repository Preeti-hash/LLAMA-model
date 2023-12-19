const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { mongoose, db } = require("./mongo.js");
const router = require("./routes/route.js");
app.use(cors({
  origin: '*'
}));

app.use(router);
const port = process.env.PORT || 5000;
  
app.listen(port, () =>
  console.log(`Server is running on  http://localhost:${port}`)
);
