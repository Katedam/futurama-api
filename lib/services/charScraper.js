// const request = require('superagent');
const { parse } = require('node-html-parser');
// const fs = require('fs');
const names = require('../../characterNamesJSON');
const {
  // parseAndCollectNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName,
  findProfessions,
  findRelatives
} = require('./scraperHelpers');


// module.exports = async() => {
const k = async() => {
  // const page = await request.get('https://futurama.fandom.com/wiki/Characters');
  // const names = parseAndCollectNames(page);
  
  // const namesRead = await fs.readFile('./characterNamesJSON.js', { encoding: 'utf8' }, (err, data) => {
  //   if(err) {
  //     return err;
  //   }

  //   try {
  //     return JSON.parse(data);
  //   } catch(e) {
  //     return e;
  //   }
  // });

  // console.log(namesRead);

  const allCharacters = await Promise.all(names.map(async(name, i) => {
    name = i >= 323 && i <= 426 ? `${name}'s head` : name;
    console.log(name);
    try {
      
      const characterDetails = {};

      const response = await getCharacterProfile(name);
      const html = parse(response.text);
      
      if(html) {
        const values = findValues(html);

        findKeys(html).forEach((key, i) => {
          if(key && values.length) {
            let value = values[i];
            
            key === 'Earth' ? key = 'Planet' : key;
            key && values ? characterDetails[key] = value : '';
            
          }
        });
        const firstShow = characterDetails.Firstappearance.replace(/"/g, '');
        characterDetails.Firstappearance = firstShow;

        characterDetails.picUrl = findImage(html);
        characterDetails.Name = findName(html);
        characterDetails.Relatives = findRelatives(html);
        characterDetails.Profession = findProfessions(html);
      }
      return characterDetails;
      
    } catch(err) {
      return '';
    }
    
  }));
  // console.log(allCharacters);
  return allCharacters;
};

k();
