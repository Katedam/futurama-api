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
  bobBarker,
  donBot
} = require('../assets/characters');

const setImages = quotes => {

  return quotes.map(quoteObj => {
    const { quote } = quoteObj;
    quote.replace(/\r?\n|\r/g, ' ');

    if(quoteObj.character === 'Bender') {
      return {
        ...quoteObj,
        image: bender,
        quote       
      };
    } 
    if(quoteObj.character === 'Leela') {
      return {
        ...quoteObj,
        image: leela,
        quote             
      };
    }
    if(quoteObj.character === 'Fry') {
      return {
        ...quoteObj,
        image: fry,
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
        character: 'Professor Farnsworth',
        image: professorFarnsworth,
        quote     
      };
    }
    if(quoteObj.character === 'Zapp Brannigan') {
      return {
        ...quoteObj,
        character: 'Zapp Brannigan',
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
        character: 'Linda the Reporter',
        image: linda,
        quote     
      };
    }
    if(quoteObj.character === 'Dr. Zoidberg') {
      return {
        ...quoteObj,
        character: 'Dr Zoidberg',
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
        character: 'Bob Barker',
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
        character: 'Morgan Proctor',
        image: morgan,
        quote     
      };
    }
    if(quoteObj.character === 'Don-Bot') {
      return {
        ...quoteObj,
        character: 'Don-Bot',
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
        character: 'Robot Mob',
        image: robotMob,
        quote     
      };
    }
    if(quoteObj.character === 'Giant Bender') {
      return {
        ...quoteObj,
        character: 'Giant Bender',
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
        image: bender,
        quote     
      };
    }
    if(quoteObj.character) {
      return {
        ...quoteObj,
        quote
      };
    }
  });
};

module.exports = {
  setImages
};
