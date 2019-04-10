require('dotenv').config();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');
const{ setImages } = require('./lib/services/prepData');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

fetchFuturamaData()
  .then(quotes => setImages(quotes))
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

