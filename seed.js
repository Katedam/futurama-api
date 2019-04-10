require('dotenv').config();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');
const { 
  bender, 
  fry, 
  leela, 
  zappBrannigan, 
  morbo, 
  url, 
  linda, 
  lurr, 
  calculon, 
  robotMob, 
  drZoidberg, 
  mom, 
  morgan, 
  kif, 
  professorFarnsworth, 
  giantBender, 
  amy, 
  hermes, 
  bobBarker 
  } = require('./lib/assets/characters');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const replaceNewlineInQuote = quote => quote.replace(/\r?\n|\r/g, ' '); 

fetchFuturamaData()
  .then(quotes => {
    return quotes.map(quoteObj => {

      const quote = replaceNewlineInQuote(quoteObj.quote);

      if(quoteObj.character === 'Bender') {
        return {
          ...quoteObj,
          image: bender        };
      } 
      if(quoteObj.character === 'Leela') {
        return {
          ...quoteObj,
          image: leela        };
      }
      if(quoteObj.character === 'Fry') {
        return {
          ...quoteObj,
          image: fry
        };
      }
      if(quoteObj.character === 'Calculon') {
        return {
          ...quoteObj,
          image: calculon
        };
      }
      if(quoteObj.character === 'URL') {
        return {
          ...quoteObj,
          image: url
        };
      }
      if(quoteObj.character === 'Professor Farnsworth') {
        return {
          ...quoteObj,
          character: 'Professor-farnsworth',
          image: professorFarnsworth
        };
      }
      if(quoteObj.character === 'Zapp Brannigan') {
        return {
          ...quoteObj,
          character: 'Zapp-brannigan',
          image: zappBrannigan
        };
      }
      if(quoteObj.character === 'Lurr') {
        return {
          ...quoteObj,
          image: lurr
        };
      }
      if(quoteObj.character === 'Morbo') {
        return {
          ...quoteObj,
          image: morbo
        };
      }
      if(quoteObj.character === 'Linda the Reporter') {
        return {
          ...quoteObj,
          character: 'Linda-the-reporter',
          image: Linda
        };
      }
      if(quoteObj.character === 'Dr. Zoidberg') {
        return {
          ...quoteObj,
          character: 'Dr-zoidberg',
          image: drZoidberg
        };
      }
      if(quoteObj.character === 'Hermes') {
        return {
          ...quoteObj,
          image: hermes
        };
      }
      if(quoteObj.character === 'Bob Barker') {
        return {
          ...quoteObj,
          character: 'Bob-barker',
          image: bobBarker
        };
      }
      if(quoteObj.character === 'Amy') {
        return {
          ...quoteObj,
          image: amy
        };
      }
      if(quoteObj.character === 'Morgan Proctor') {
        return {
          ...quoteObj,
          character: 'Morgan-proctor',
          image: morgan
        };
      }
      if(quoteObj.character === 'Don-Bot') {
        return {
          ...quoteObj,
          character: 'Don-bot',
          image: donBot
        };
      }
      if(quoteObj.character === 'Mom') {
        return {
          ...quoteObj,
          image: mom
        };
      }
      if(quoteObj.character === 'Robot Mob') {
        return {
          ...quoteObj,
          character: 'Robot-mob',
          image: robotMob
        };
      }
      if(quoteObj.character === 'Giant Bender') {
        return {
          ...quoteObj,
          character: 'Giant-bender',
          image: giantBender
        };
      }
      if(quoteObj.character === 'Kif') {
        return {
          ...quoteObj,
          image: kif
        };
      }
      if(quoteObj.character === 'Flexo') {
        return {
          ...quoteObj,
          image: bender
        };
      }
      if(quoteObj.character) {
        return {
          ...quoteObj,
          quote
        };
      }
    });
  })
  .then(quotesWithImages => Quote.create(quotesWithImages))
  .finally(() => mongoose.connection.close());

