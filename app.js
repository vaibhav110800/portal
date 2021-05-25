//jshint esversion:6
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://admin-vt:test1234@cluster0.lqpbs.mongodb.net/entry", { useNewUrlParser: true }, { useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, "public")));

//create data schema
const entryUser = {
    email: String,
    name: String,
    phoneNo: String,
    rollNo: String,
    prob: String,
    comp: String
}

const Entry = mongoose.model("Entry", entryUser);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.post("/", function (req, res) {
    let newEntry = new Entry({
        email: req.body.email,
        name: req.body.name,
        phoneNo: req.body.phone,
        rollNo: req.body.roll,
        prob: req.body.prob,
        comp: req.body.comp
    });
    newEntry.save();
    res.redirect('/');
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started");
});