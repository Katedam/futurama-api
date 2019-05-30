const Quote = require('../Models/Quote');
const { Router } = require('express');

const removeDashAndCapitalize = character => {
  if(character.includes('-')) {
    return character
      .split('-')
      .map(name => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
  }
  return character;
};

module.exports = Router()

  .get('/quotes', (req, res, next) => {
    const query = {};
    const { page = 1, perPage = 20, search } = req.query;

    if(search) {
      query.quote = {
        $regex: new RegExp(search, 'i')
      };
    }
    
    Quote
      .find(query)
      .skip(+perPage * (+page - 1))
      .limit(+perPage)
      .select({ __v: false, _id: false })
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/quotes/:count', (req, res, next) => {
    Quote
      .getRandomQuotes(req.params.count)
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/characters/:character', (req, res, next) => {
    const { character } = req.params; 
    Quote
      .getAllQuotesByCharacter(removeDashAndCapitalize(character))
      .then(quotes => res.send(quotes))
      .catch(next);
  })

  .get('/characters/:character/:count', (req, res, next) => {
    const { character, count } = req.params;
    Quote
      .getRandomQuotesByCharacter(removeDashAndCapitalize(character), count)
      .then(quotes => res.send(quotes))
      .catch(next);
  });


