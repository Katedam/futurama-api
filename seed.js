require('dotenv').config();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const benderImage = 'https://imgur.com/TQbrGRN';
const fryImage = 'https://imgur.com/aLPxYmf';
const leelaImage = 'https://imgur.com/uo3u9u1';

const replaceNewlineInQuote = quote => quote.replace(/\r?\n|\r/g, ' '); 

fetchFuturamaData()
  .then(quotes => {
    return quotes.map(quoteObj => {

      const quote = replaceNewlineInQuote(quoteObj.quote);

      if(quoteObj.character === 'Bender') {
        return {
          ...quoteObj,
          image: benderImage,
          quote
        };
      } 

      if(quoteObj.character === 'Leela') {
        return {
          ...quoteObj,
          image: leelaImage,
          quote
        };
      }

      if(quoteObj.character === 'Fry') {
        return {
          ...quoteObj,
          image: fryImage,
          quote
        };
      }

      if(quoteObj.character) {
        return {
          ...quoteObj,
          quote
        };
      }
      if(quote.character) {
        return {
          ...quote
        };
      }
    });
  })
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

