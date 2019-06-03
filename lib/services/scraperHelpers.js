const request = require('superagent');
const { parse } = require('node-html-parser');

export const parseAndCollectNames = res => {
  const html = parse(res.text);
  return html.querySelectorAll('li a').map(link => link.text);
};

export const trimResultToJustCharacterNames = result => {
  const characterNames = [];
  
  result
    .slice(313, result.length - 47)
    .forEach(characterName => characterNames.push(characterName));

  return characterNames;
};

export const getCharacterProfile = character => {
  return request.get(`https://futurama.fandom.com/wiki/${character}`);
};

export const findKeys = html => {
  return html.querySelectorAll('.pi-data-label').map(label => label.text).slice(1);
};

export const findValues = html => {
  return html.querySelectorAll('.pi-data-value').map(value => value.text).slice(1);
};

export const findName = html => {
  return html.querySelector('h1.page-header__title').text;
};
