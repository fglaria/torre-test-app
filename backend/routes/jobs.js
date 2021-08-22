var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const api_url =  "https://torre.co/api/suite/opportunities/";

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(`${api_url}${req.params.id}`);
  fetch(`${api_url}${req.params.id}`)
    .then(res => res.json())
    .then(body => res.send(body));
});

module.exports = router;
