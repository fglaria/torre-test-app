var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body));
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  // res.render('user', { id: req.params.id });
  fetch('https://torre.bio/api/bios/' + req.params.id)
    .then(res => res.json())
    // .then(body => console.log(body));
    .then(body => res.render('user', { id: body.person.name }));
});

module.exports = router;
