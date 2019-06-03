const request = require('superagent');
const { parse } = require('node-html-parser');
const {
  parseAndCollectNames,
  trimResultToJustCharacterNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findName
} = require('./lib/services/scraperHelpers');


request.get('https://futurama.fandom.com/wiki/Characters')
  .then(parseAndCollectNames)
  .then(trimResultToJustCharacterNames)
  .then(() => {
    const character = 'Bender_Bending_Rodríguez';
    return getCharacterProfile(character);
  })
  .then(res => res.text)
  .then(parse)
  .then(html => {
    const characterDetails = {};
    const values = findValues(html);

    characterDetails.name = findName(html);

    findKeys(html).forEach((key, i) => characterDetails[key] = values[i]);

    return characterDetails;
  })
  .then(console.log);





