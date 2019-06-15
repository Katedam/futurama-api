const request = require('superagent');
const { parse } = require('node-html-parser');
const {
  parseAndCollectNames,
  getCharacterProfile,
  findKeys,
  findValues,
  findImage,
  findName,
} = require('./scraperHelpers');


module.exports = async() => {
  const page = await request.get('https://futurama.fandom.com/wiki/Characters');
  const names = parseAndCollectNames(page);
  
  const allCharacters = await Promise.all(names.map(async(name, i) => {
    name = i >= 323 && i <= 426 ? `${name}'s head` : name;
    
    try {
      
      const response = await getCharacterProfile(name);
      
      const html = parse(response.text);
      
      const characterDetails = {};
      
      if(html) {

        characterDetails.picUrl = findImage(html);
        
        const values = findValues(html);
        
        characterDetails.Name = findName(html);
        
        findKeys(html).forEach((key, i) => {
          if(key && values.length) {
            key === 'Earth' ? key = 'Planet' : key;
            key && values ? characterDetails[key] = values[i] : '';
          }
        });

      }

      return characterDetails;
      
    } catch(err) {
      return '';
    }
    
  }));

  return allCharacters;
};
