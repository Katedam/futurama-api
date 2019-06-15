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
    character = character.replace('\'', '%27');
    return request.get(`https://futurama.fandom.com/wiki/${character}`);
  }
};



// const findProfessions = html => {
//   const chunks = html.querySelectorAll('.pi-item .pi-data');

//   let jobs;

//   chunks.forEach(html => {
//     const label = html.querySelector('.pi-data-label');
//     const value = html.querySelector('.pi-data-value');

//     if(label) {

//       const cleanLabel = (label.text
//         .substring(0, 1)
//         .toUpperCase() + label
//         .text
//         .substring(1))
//         .replace(' ', '');

//       if(cleanLabel === 'Profession') {
//         jobs = findJobs(value);
//       }
//     }
//   });

//   return jobs.length > 0 ? jobs : ['no profession available'];
// };



// const findJobs = value => {
//   const inner = value.innerHTML;
//   const arr = inner.replace('<b>Currently:</b>', '').replace('<b>Formerly:</b>', '').split('<br />');
//   if(!arr) {
//     const jobs = arr.map((str, i) => {
//       if(str === ' title=') {
//         return arr[i + 1];
//       }
//     }).filter(r => r);
//     return jobs;
//   }

//   const currently = arr[1] ? arr[1].split(',') : null;
//   const formerly = arr[0] ? arr[0].split(',') : null;
//   const jobs = [...currently, ...formerly].filter(job => job);
//   console.log('text', value.text);
//   return jobs;
// };



const findRelatives = html => {
  const chunks = html.querySelectorAll('.pi-item .pi-data');

  let relatives = [];

  chunks.forEach(html => {
    const label = html.querySelector('.pi-data-label');
    const value = html.querySelector('.pi-data-value');

    if(label) {

      const cleanLabel = (label.text.substring(0, 1).toUpperCase() + label.text.substring(1)).replace(' ', '');

      if(cleanLabel === 'Relatives') {
        relatives = makeRelativesList(value);
      }
    }
  });

  return relatives.length > 0 ? relatives : ['no relatives available'];
};



const makeRelativesList = value => {
  const inner = value.innerHTML;
  const arr = inner.split('"');

  const relatives = arr.map((str, i) => {
    if(str === ' title=') {
      return arr[i + 1];
    }
  }).filter(r => r);

  return relatives;
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
  findRelatives
};
