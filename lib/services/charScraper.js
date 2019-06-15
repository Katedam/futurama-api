const { parse } = require('node-html-parser');
// const fs = require('fs');
const names = require('../../characterNamesJSON');
const {
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName,
  findRelatives
} = require('./scraperHelpers');


module.exports = async() => {
// const k = async() => {

  const allCharacters = await Promise.all(names.map(async(name) => {

    try {
      
      const characterDetails = {};
      
      const response = await getCharacterProfile(name);
      const html = parse(response.text);

      if(!html) {
        characterDetails.HTML = 'NOT FOUND';
      }
      else {
        const values = findValues(html);

        findKeys(html).forEach((key, i) => {
          if(key && values) {
            let value = values[i];
            
            key === 'Earth' ? key = 'Planet' : key;
            key && values ? characterDetails[key] = value : 'N/A';
            
          }
        });

        if(characterDetails.Firstappearance) {
          const firstShow = characterDetails.Firstappearance.replace(/"/g, '');
          characterDetails.Firstappearance = firstShow;
        }

        characterDetails.picUrl = findImage(html);
        characterDetails.Name = findName(html);
        characterDetails.Relatives = findRelatives(html);
      }
      return characterDetails;
      
    } catch(error) {
      return `ERROR: ${name} ${error}`;
    }
    
  }));
  // const charactersToWrite = JSON.stringify(allCharacters);
  // fs.writeFile('./allCharacters.json', charactersToWrite, err => {
  //   if(err) throw err;
  // });

  return allCharacters;
};

// k();
