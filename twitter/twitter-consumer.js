var Twit = require("twit"); // this is how we import the twit package
var moment = require("moment");
// var config = require(); //this is we import the config file which is a js file which contains the keys ans tokens
var T = new Twit({
  consumer_key: "QY7MSari48vis6baRBt6eEbTT",
  consumer_secret: "A9aDa0ztStrzg6lqgPMIOvX2oLnprHMepRJACAA7h6ikg8OwrE",
  access_token: "65379359-xQjgUyPbI3GCo7T0ReUhchU7lkvDRPWJnFWviyEK9",
  access_token_secret: "Y3CwQgP3fCCj1uSgysYY4CwthibSPtXibOyVJTbEnLxw7",
  timeout_ms: 60 * 1000,
  strictSSL: true,
}); //this is the object of twit which will help us to call functions inside it
var params = {
  q: "(covid OR corona) (from:g1rn OR from:tribunadonorte)",
  count: 50,
  result_type: "recent",
};
exports.getTweets = function () {
  return new Promise((resolve, reject) => {
    T.get("search/tweets", params, searchedData);
    function searchedData(err, data, response) {
      if (typeof data !== "undefined") {
        let tweets = data.statuses.map(function (tweet) {
          data = moment(tweet.created_at).format("DD/MM/YYYY");
          hora = moment(tweet.created_at).format("h:mm");
          url = tweet.text.split("//")[1];
          return {
            data: data,
            hora: hora,
            user: tweet.user.name,
            texto: tweet.text,
            url: "https://" + url,
          };
        });
        resolve(tweets);
      } else {
        reject();
      }
    }
  });
};
// getTweets().then((t) => {
//   console.log(t);
// });
