const request = require('superagent');
const { parse } = require('node-html-parser');

const characterNames = [];

const parseAndCollectNames = res => {
  const html = parse(res.text);
  return html.querySelectorAll('li a').map(link => link.text);
};
const trimResultToJustCharacterNames = result => {
  result
    .slice(313, result.length - 47)
    .forEach(characterName => characterNames.push(characterName));
};
const getCharacterProfile = character => {
  return request.get(`https://futurama.fandom.com/wiki/${character}`);
};
const findKeys = html => {
  return html.querySelectorAll('.pi-data-label').map(label => label.text).slice(1);
};

const findValues = html => {
  return html.querySelectorAll('.pi-data-value').map(value => value.text).slice(1);
};

const findName = html => {
  return html.querySelector('h1.page-header__title').text;
};

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





