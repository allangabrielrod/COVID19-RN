const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      index       = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//Static Folders
app.use(express.static("./public"));
app.use(express.static("./node_modules/moment/min"));
app.use(express.static("./node_modules/bootstrap/"));
app.use(express.static("./node_modules/font-awesome/"));
app.use(express.static("./node_modules/bootstrap-table/"));
app.use(express.static("./node_modules/jquery/"));
app.use(express.static("./node_modules/chart.js/"));
app.use(express.static("./node_modules/popper.js/"));

//Routes
app.use("/", index);

//Server Start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started...");
});
