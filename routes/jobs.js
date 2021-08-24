var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const api_url =  "https://torre.co/api/suite/opportunities/";
const post_url = "https://search.torre.co/opportunities/_search/?";

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(`${api_url}${req.params.id}`);
  fetch(`${api_url}${req.params.id}`)
    .then(res => res.json())
    .then(body => res.send(body))
    .catch(error => res.send(error));
});

router.get('/size/:size/offset/:offset/aggregate/:aggregate', (req, res, next) => {
  const size = req.params.size;
  const offset = req.params.offset;
  const aggregate = req.params.aggregate;

  fetch(`${post_url}size=${size}&offset=${offset}&aggregate=${aggregate}`, {
    method: 'POST',
  })
  .then(res => res.json())
  .then(body => res.send(body))
  .catch(error => res.send(error));
});

module.exports = router;
