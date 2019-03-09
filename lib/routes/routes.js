const Quote = require('../Models/Quote');
const { Router } = require('express');

module.exports = Router()

  .get('/api/quotes', (req, res, next) => {
    Quote
      .find()
      .select({ __v: false, _id: false })
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/api/quotes/:count', (req, res, next) => {
    Quote
      .getRandomQuotes(req.params.count)
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/api/characters/:character', (req, res, next) => {
    Quote
      .getAllQuotesByCharacter(req.params.character)
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/api/characters/:character/:count', (req, res, next) => {
    Quote
      .getRandomQuotesByCharacter(req.params.character, req.params.count)
      .then(quotes => res.send(quotes))
      .catch(next);
  });

