const Quote = require('../Models/Quote');
const { Router } = require('express');
const { HttpError } = require('../middleware/error');

module.exports = Router()

  .get('/', (req, res, next) => {
    Quote
      .find()
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/:count', (req, res, next) => {
    Quote
      .getRandomQuotes(req.params.count)
      .then(quotes => res.send(quotes))
      .catch(next);
  });

