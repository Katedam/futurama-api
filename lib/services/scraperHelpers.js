const request = require('superagent');
const { parse } = require('node-html-parser');

const parseAndCollectNames = res => {
  const html = parse(res.text);
  return html.querySelectorAll('li a').map(link => link.text);
};

const trimResultToJustCharacterNames = result => {
  const characterNames = [];

  result
    .slice(313, result.length - 47)
    .forEach(characterName => characterNames.push(characterName));

  return characterNames;
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

module.exports = {
  parseAndCollectNames,
  trimResultToJustCharacterNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findName
}
