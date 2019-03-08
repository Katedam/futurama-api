const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/futurama', { useNewUrlParser: true });

fetchFuturamaData()
  .then(quotes => Quote.create(quotes))
  .finally(() => mongoose.connection.close());

