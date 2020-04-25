const express = require("express"),
  router = express.Router({ mergeParams: true });

router.get("/sobre", (req, res) => {
  res.render("pages/sobre");
});

router.get("*", (req, res) => {
  res.render("pages/notfound");
});

module.exports = router;
