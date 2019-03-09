require('dotenv').config();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const benderImage = 'https://imgur.com/TQbrGRN';
const fryImage = 'https://imgur.com/aLPxYmf';
const leelaImage = 'https://imgur.com/uo3u9u1';

fetchFuturamaData()
  .then(quotes => {
    return quotes.map(quote => {
      if(quote.character === 'Bender') {
        return {
          ...quote,
          image: benderImage,
        };
      } 
      if(quote.character === 'Leela') {
        return {
          ...quote,
          image: leelaImage,
        };
      }
      if(quote.character === 'Fry') {
        return {
          ...quote,
          image: fryImage,
        };
      }
    });
  })
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

