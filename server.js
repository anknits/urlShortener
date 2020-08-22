const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.mongodbConnectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.Port || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`));