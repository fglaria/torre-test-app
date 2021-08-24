var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const api_url = "https://torre.bio/api/bios/";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  // res.render('user', { id: req.params.id });
  fetch(`${api_url}${req.params.id}`)
    .then(res => res.json())
    .then(body => res.send(body));
});

router.get('/search/:param', function(req, res, next) {
  fetch('https://search.torre.co/people/_search/?offset=20&size=1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({"size": 1})
  })
    .then(res => res.text())
    .then(body => console.log(body));
});

router.get('/s/:param', function(req, res, next) {
  router.post('https://search.torre.co/people/_search/')
});

module.exports = router;
