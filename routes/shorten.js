const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ShortUrl = require("../models/shortUrl");

router.post("/", async (req, res) => {
    if (!ValidateUrls(req.body.urls)) {
        res.status(422).json({ error: "one or more url is invalid" });
    }
    const arrayToReturn = new Array();
    findOrCreate(req.body.urls, arrayToReturn)
        .then((result) => {
            res.status(200).json(arrayToReturn)
        })
        .catch((err) => {
            console.log("Error occured: " + err);
            res.status(500).json({ error: err });
        });
});

async function findOrCreate(urls, arrayToReturn) {
    for (var url of urls) {
        var dbUrl = await ShortUrl.findOne({ full: url });
        if (dbUrl != null) {
            arrayToReturn.push(dbUrl);
        }
        else {
            var shortUrl = await ShortUrl.create({ full: url });
            arrayToReturn.push(shortUrl);
        }
    }
}

function ValidateUrls(urls) {
    urls.forEach(url => {
        if (!validateURL(url)) return false;
    });
    return true;
}

function validateURL(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
}

module.exports = router;