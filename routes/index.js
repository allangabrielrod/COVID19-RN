const express = require("express"),
  router = express.Router({ mergeParams: true }),
  request = require("request"),
  twitter = require("../twitter/twitter-consumer");

router.get("/", (req, res) => {
  res.redirect("/inicio");
});

router.get("/inicio", (req, res) => {
  request.get(
    "https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN",
    function (err, resp, body) {
      if (err) {
        console.log("something went wrong :/");
      } else {
        res.render("pages/index", { data: JSON.parse(body) });
      }
    }
  );
});

router.get("/graficos", (req, res) => {
  request.get(
    "https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN",
    (err, resp, body) => {
      if (err) {
        console.log("something went wrong :/");
      } else {
        request.get(
          "https://brasil.io/api/dataset/covid19/caso/data?state=RN&place_type=state",
          (err, resp, body2) => {
            res.render("pages/charts", {
              data: JSON.parse(body),
              timeData: JSON.parse(body2),
            });
          }
        );
      }
    }
  );
});

router.get("/noticias", (req, res) => {
  twitter.getTweets().then((tweets) => {
    res.render("pages/noticias", { data: tweets });
  });
});

router.get("/sobre", (req, res) => {
  res.render("pages/sobre");
});

router.get("*", (req, res) => {
  res.render("pages/notfound");
});

module.exports = router;
