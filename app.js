const express = require("express"),
  app = express(),
  noticias = require("./routes/noticias"),
  index = require("./routes/index");
// sobre = require("/routes/sobre");

app.set("view engine", "ejs");

//Static Folders
app.use(express.static("./public"));
app.use(express.static("./node_modules/moment/min"));
app.use(express.static("./node_modules/bootstrap/"));
app.use(express.static("./node_modules/jquery/"));
app.use(express.static("./node_modules/chart.js/"));
app.use(express.static("./node_modules/popper.js/"));

//Routes
app.use("/", index);
app.use("/", noticias);
// app.use("/", sobre);

//Server Start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started...");
});
