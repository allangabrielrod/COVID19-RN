const express = require("express"),
      router  = express.Router({mergeParams: true}),
      twitter = require("../twitter/twitter-consumer");

router.get("/", (req, res) => {
  twitter.getTweets().then((tweets) => {
    // console.log(tweets);
    res.render("pages/noticias", { data: tweets });
  });
  //
});

router.get("*", (req, res) => {
  console.log("OOK");
  res.render("pages/notfound");
});

module.exports = router;
