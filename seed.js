require('dotenv').config();
require('./lib/utils/connect')();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');
const { setImages } = require('./lib/services/prepData');

fetchFuturamaData()
  .then(quotes => setImages(quotes))
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

