require('dotenv').config();
require('./lib/utils/connect')();
const fetchFuturamaQuotes = require('./lib/services/quotesScraper');
const fetchFuturamaCharacters = require('./lib/services/charScraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');
const { setImages } = require('./lib/services/prepData');

fetchFuturamaQuotes()
  .then(quotes => setImages(quotes))
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

fetchFuturamaCharacters()
  .then(chars => )



