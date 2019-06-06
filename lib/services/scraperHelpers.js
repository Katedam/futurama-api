const request = require('superagent');
const { parse } = require('node-html-parser');

const parseAndCollectNames = res => {
  const html = parse(res.text);
  const container = html.querySelector('#WikiaArticle');
  const lists = container.querySelectorAll('li a');
  return lists.map(link => link.text);
};

const getCharacterProfile = character => {
  character = character.replace(/\s/g, '_');
  return request.get(`https://futurama.fandom.com/wiki/${character}`);
};

const findKeys = html => {
  const label = html.querySelectorAll('.pi-data-label').map(label => label.text).slice(1);
  return label.substring(0, 1).toLowerCase() + label.substring(1);
};

const findValues = html => {
  return html.querySelectorAll('.pi-data-value').map(value => value.text).slice(1);
};

const findImage = html => {
  return html.querySelector('.pi-image-thumbnail').rawAttrs.split('"')[1];
};

const findName = html => {
  return html.querySelector('h1.page-header__title').text;
};

module.exports = {
  parseAndCollectNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName
};
