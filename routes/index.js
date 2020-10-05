const express = require("express"),
      router  = express.Router({ mergeParams: true }),
      fetch   = require("node-fetch"),
      twitter = require("../twitter/twitter-consumer"),
      mailer  = require("nodemailer");

let transporter = mailer.createTransport({
    host: process.env.EHOST,
    port: process.env.EPORT,
    secure: false,
    auth: {
        user: process.env.EUSER,
        pass: process.env.EPASSWD
    }
});

router.get('/', (req, res) => {
  res.redirect('/inicio');
});

router.get('/inicio', (req, res) => {
  const apiURL = "https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN";

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      data.results = data.results.map(result => {
        let className = '';
        const { confirmed } = result;
        if (confirmed > 0 && confirmed < 50)
          className = 'fill-1';
        else if (confirmed >= 50 && confirmed < 100)
          className = 'fill-2';
        else if (confirmed >= 100 && confirmed < 150)
          className = 'fill-3';
        else if (confirmed >= 150 && confirmed < 400)
          className = 'fill-4';
        else if (confirmed >= 400)
          className = 'fill-5';

        return { ...result, className };
      });
      res.render('pages/index', { data });
    })
    .catch(err => console.error(err));
});

router.get('/graficos', (req, res) => {
  const apiURL = "https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&state=RN";
  const timeDataURL = "https://brasil.io/api/dataset/covid19/caso/data?state=RN&place_type=state";
  
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      fetch(timeDataURL)
        .then(res => res.json())
        .then(timeData => {
          res.render('pages/charts', { data, timeData});
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

router.get('/noticias', (req, res) => {
  twitter.getTweets().then((tweets) => {
    res.render('pages/noticias', { data: tweets });
  });
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre');
});

router.post('/contato', (req, res) => {
  let nome = req.body.contato.nome + " " + req.body.contato.snome;
  let email = "<" + req.body.contato.email + ">";
  transporter.sendMail({
    from: nome + email,
    to: process.env.ELIST,
    subject: req.body.contato.assunto,
    text: req.body.contato.mensagem + "\nDe: "+ nome + " " + email
  }); 
  res.redirect("back");
});

router.get('*', (req, res) => {
  res.render('pages/notfound');
});

module.exports = router;
