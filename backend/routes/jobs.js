var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const api_url =  "https://torre.co/api/suite/opportunities/";

router.get('/:id', function(req, res, next) {
  fetch(`${api_url}${req.params.id}`)
    // .then(res => {console.log(res); res.json()})
    .then(body => res.send(body));
});

module.exports = router;
