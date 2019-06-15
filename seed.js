require('dotenv').config();
require('./lib/utils/connect')();
// const scrapeFuturamaQuotes = require('./lib/services/quotesScraper');
const scrapeFuturamaCharacters = require('./lib/services/charScraper');
// const Quote = require('./lib/Models/Quote');
const Character = require('./lib/Models/Character');
const mongoose = require('mongoose');

scrapeFuturamaCharacters()
  .then(chars => Character.create(chars))
  .finally(() => mongoose.connection.close());

