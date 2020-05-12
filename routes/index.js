const express = require('express'),
  router = express.Router({ mergeParams: true }),
  request = require('request'),
  twitter = require('../twitter/twitter-consumer');

router.get('/', (req, res) => {
  res.redirect('/inicio');
});

router.get('/inicio', (req, res) => {
  request.get(
    'https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN',
    function (err, resp, body) {
      if (err) {
        console.log('something went wrong :/');
      } else {
        const data = JSON.parse(body);

        data.results = data.results.map(result => {
          let className = '';
          const {confirmed} = result;
          if(confirmed > 0 && confirmed < 50)
            className = 'fill-1';
          else if(confirmed >= 50 && confirmed < 100)
            className = 'fill-2';
          else if(confirmed >= 100 && confirmed < 150)
            className = 'fill-3';
          else if(confirmed >= 150 && confirmed < 400)
            className = 'fill-4';
          else if(confirmed >= 400)
            className = 'fill-5';

          return {...result, className};
        });

        res.render('pages/index', { data });
      }
    }
  );
});

router.get('/graficos', (req, res) => {
  request.get(
    'https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN',
    (err, resp, body) => {
      if (err) {
        console.log('something went wrong :/');
      } else {
        request.get(
          'https://brasil.io/api/dataset/covid19/caso/data?state=RN&place_type=state',
          (err, resp, body2) => {
            res.render('pages/charts', {
              data: JSON.parse(body),
              timeData: JSON.parse(body2),
            });
          }
        );
      }
    }
  );
});

router.get('/noticias', (req, res) => {
  twitter.getTweets().then((tweets) => {
    res.render('pages/noticias', { data: tweets });
  });
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre');
});

router.get('*', (req, res) => {
  res.render('pages/notfound');
});

module.exports = router;
