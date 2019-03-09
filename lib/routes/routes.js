const Quote = require('../Models/Quote');
const { Router } = require('express');
// const { HttpError } = require('../middleware/error');

module.exports = Router()

  .get('/', (req, res, next) => {
    Quote
      .find()
      .select({ __v: false, _id: false })
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/:count', (req, res, next) => {
    Quote
      .getRandomQuotes(req.params.count)
      .select({ __v: false, _id: false })
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/:character/:count', (req, res, next) => {
    Quote
      .getRandomQuotesByCharacter(req.params.character, req.params.count)
      .select({ __v: false, _id: false })
      .then(quotes => res.send(quotes))
      .catch(next);

  });

