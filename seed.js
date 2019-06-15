require('dotenv').config();
require('./lib/utils/connect')();
const fs = require('fs');
// const scrapeFuturamaQuotes = require('./lib/services/quotesScraper');
// const scrapeFuturamaCharacters = require('./lib/services/charScraper');
const Quote = require('./lib/Models/Quote');
// const Character = require('./lib/Models/Character');
const mongoose = require('mongoose');
// const { setImages } = require('./lib/services/prepData');

const quotes = fs.readFile('./quotesJson.js', { encoding: 'utf8' }, (err, data) => {
  if(err) {
    return err;
  }
  
  try {
    return data;
  } catch(e) {
    return e;
  }
});

Quote.create(quotes)
  .finally(() => mongoose.connection.close());

// scrapeFuturamaCharacters()
// .then(chars => Character.create(chars))
// .finally(() => mongoose.connection.close());

// scrapeFuturamaQuotes()
//   .then(quotes => setImages(quotes))
//   .then(quotesWithImages => Quote.create(quotesWithImages))
//   .finally(() => mongoose.connection.close());
