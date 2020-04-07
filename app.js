var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.redirect("/inicio");
});

app.get("/inicio", function(req, res) {
    request.get("https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN", function (err, resp, body) {
        if (err) {
            console.log("something went wrong :/");
        } else {
            res.render("index", { data: JSON.parse(body) });
        }
    });
});

app.get("*", function(req,res) {
    res.render("notfound");
});

app.listen(3000, function (){
    console.log("Listening at 3000.");
});