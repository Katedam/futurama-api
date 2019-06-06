const request = require('superagent');
const { parse } = require('node-html-parser');
const {
  parseAndCollectNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName
} = require('./lib/services/scraperHelpers');


module.exports = () => {
  return request.get('https://futurama.fandom.com/wiki/Characters')
    .then(parseAndCollectNames)
    .then(names => {
      return Promise.all(names.map((name, i) => {
        name = i >= 323 && i <= 426 ? `${name}'s head` : name;
        getCharacterProfile(name)
          .then(res => res.text)
          .then(parse)
          .then(html => {
            const characterDetails = {};
          
            characterDetails.picUrl = findImage(html);

            const values = findValues(html);
            characterDetails.name = findName(html);
            
            findKeys(html).forEach((key, i) => {
              key && values ? characterDetails[key] = values[i] : '';
            });
            
            return characterDetails;
          })
          .catch(error => {
            if(error) {
              return {};
            }
          });
      }));
    });
};





