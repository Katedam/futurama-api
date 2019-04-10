require('dotenv').config();
const fetchFuturamaData = require('./lib/services/scraper');
const Quote = require('./lib/Models/Quote');
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const benderImage = 'https://imgur.com/TQbrGRN';
const fryImage = 'https://imgur.com/aLPxYmf';
const leelaImage = 'https://imgur.com/uo3u9u1';
const professorFarnsworth = 'https://imgur.com/mqtOU33';
const morbo = 'https://imgur.com/5oYUiAM';
const lindaTheReporter = 'https://imgur.com/eGopvZl';
const zappBrannigan = 'https://imgur.com/woltzOI';
const lurr = 'https://imgur.com/wymGUt1';
const url = 'https://imgur.com/ezIkx52';
const calculon = 'https://imgur.com/xy9m7NB';
const robotMob = 'https://imgur.com/ErXSKFh';
const hermes = 'https://imgur.com/4vhKA7g';
const morganProctor = 'https://imgur.com/uILPgYJ';
const mom = 'https://imgur.com/PrDvDyu';
const kif = 'https://imgur.com/3IKxX9L';
const drZoidberg = 'https://imgur.com/8jSlTzE';
const giantBender = 'https://imgur.com/jXNROYf';
const donBot = 'https://imgur.com/acP9TZq';
const bobBarker = 'https://imgur.com/CMqNypr';
const amy = 'https://imgur.com/p48918u';

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

      if(quoteObj.character === 'Calculon') {
        return {
          ...quoteObj,
          image: calculon,
          quote
        };
      }

      if(quoteObj.character === 'URL') {
        return {
          ...quoteObj,
          image: url,
          quote
        };
      }

      if(quoteObj.character === 'Professor Farnsworth') {
        return {
          ...quoteObj,
          character: 'Professor-farnsworth',
          image: professorFarnsworth,
          quote
        };
      }
      if(quoteObj.character === 'Zapp Brannigan') {
        return {
          ...quoteObj,
          character: 'Zapp-brannigan',
          image: zappBrannigan,
          quote
        };
      }
      if(quoteObj.character === 'Lurr') {
        return {
          ...quoteObj,
          image: lurr,
          quote
        };
      }
      if(quoteObj.character === 'Morbo') {
        return {
          ...quoteObj,
          image: morbo,
          quote
        };
      }
      if(quoteObj.character === 'Linda the Reporter') {
        return {
          ...quoteObj,
          character: 'Linda-the-reporter',
          image: lindaTheReporter,
          quote
        };
      }
      if(quoteObj.character === 'Dr. Zoidberg') {
        return {
          ...quoteObj,
          character: 'Dr-zoidberg',
          image: drZoidberg,
          quote
        };
      }
      if(quoteObj.character === 'Hermes') {
        return {
          ...quoteObj,
          image: hermes,
          quote
        };
      }
      if(quoteObj.character === 'Bob Barker') {
        return {
          ...quoteObj,
          character: 'Bob-barker',
          image: bobBarker,
          quote
        };
      }
      if(quoteObj.character === 'Amy') {
        return {
          ...quoteObj,
          image: amy,
          quote
        };
      }
      if(quoteObj.character === 'Morgan Proctor') {
        return {
          ...quoteObj,
          character: 'Morgan-proctor',
          image: morganProctor,
          quote
        };
      }
      if(quoteObj.character === 'Don-Bot') {
        return {
          ...quoteObj,
          character: 'Don-bot',
          image: donBot,
          quote
        };
      }
      if(quoteObj.character === 'Mom') {
        return {
          ...quoteObj,
          image: mom,
          quote
        };
      }
      if(quoteObj.character === 'Robot Mob') {
        return {
          ...quoteObj,
          character: 'Robot-mob',
          image: robotMob,
          quote
        };
      }
      if(quoteObj.character === 'Giant Bender') {
        return {
          ...quoteObj,
          character: 'Giant-bender',
          image: giantBender,
          quote
        };
      }
      if(quoteObj.character === 'Kif') {
        return {
          ...quoteObj,
          image: kif,
          quote
        };
      }
      if(quoteObj.character === 'Flexo') {
        return {
          ...quoteObj,
          image: benderImage,
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

