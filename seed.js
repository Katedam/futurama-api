require('dotenv').config();
require('./lib/utils/connect')();
const scrapeFuturamaCharacters = require('./lib/services/charScraper');
// const Quote = require('./lib/Models/Quote');
const Character = require('./lib/Models/Character');
const mongoose = require('mongoose');
// const quotes = require('./quotesJson');

// Quote.create(quotes)
//   .finally(() => mongoose.connection.close());

scrapeFuturamaCharacters()
  .then(chars => Character.create(chars))
  .finally(() => mongoose.connection.close());

