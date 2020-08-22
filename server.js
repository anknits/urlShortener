const express = require("express");
const shorten = require("./routes/shorten");
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

mongoose.connect(process.env.mongodbConnectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:shortUrl', async (req, res) => {
    const dbUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (dbUrl == null) res.send(404);
    dbUrl.clicks++;
    dbUrl.save();
    res.redirect(dbUrl.full);
});

app.use("/api/shorten", shorten);

const port = process.env.Port || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`));