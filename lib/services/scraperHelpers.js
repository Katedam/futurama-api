const request = require('superagent');
const { parse } = require('node-html-parser');

const parseAndCollectNames = res => {
  const html = parse(res.text);
  const container = html.querySelector('#WikiaArticle');
  const lists = container.querySelectorAll('li a');
  return lists.map(link => link.text);
};

const getCharacterProfile = character => {
  if(character) {
    character = character.replace(/\s/g, '_');
    return request.get(`https://futurama.fandom.com/wiki/${character}`);
  }
};

/* get all .pi-item pi-data pi-item-spacing pi-border-color 
then find key/value in each of these sections

clean up value if Relationship or First appearance*/

const findInfo = html => {
  const chunks = html.querySelectorAll('.pi-item .pi-data');

  return chunks.map(html => {
    const label = html.querySelector('.pi-data-label');
    const value = html.querySelector('.pi-data-value');
    if(label) {
      const cleanLabel =  (label.text.substring(0, 1).toUpperCase() + label.text.substring(1)).replace(' ', '');
      
      if(cleanLabel === 'Relatives') {
        const inner = value.innerHTML;
        const arr = typeof(inner) === String ? inner.split('"') : null;
        console.log(arr);
        const relatives = arr.map((str, i) => {
          if(str === ' title=') {
            return arr[i + 1];
          }
        }).filter(relative => relative);
        return relatives;
      }
    }
  });
};

const findKeys = html => {
  const labels = html.querySelectorAll('.pi-data-label');
  if(labels) {
    return labels.map(label => {
      return (label.text.substring(0, 1).toUpperCase() + label.text.substring(1)).replace(' ', '');
    }).slice(1);
  }
};

const findValues = html => {
  const values = html.querySelectorAll('.pi-data-value');
  if(values) {
    return values.map(value => value.text).slice(1);
  }
};

const findImage = html => {
  const img = html.querySelector('.pi-image-thumbnail');
  return img ? img.rawAttrs.split('"')[1] : '';
};

const findName = html => {
  const nameHtml = html.querySelector('h1.page-header__title');
  if(nameHtml) {
    return nameHtml.text;
  }
};

module.exports = {
  parseAndCollectNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName,
  findInfo
};
