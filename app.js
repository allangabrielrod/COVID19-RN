const express = require("express"),
      app     = express(),
      request = require("request");

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
            res.render("pages/index", { data: JSON.parse(body) });
        }
    });
});

app.get("*", function(req,res) {
    res.render("pages/notfound");
});

app.listen(process.env.PORT, function (){
    console.log("Listening at " + process.env.PORT);
});