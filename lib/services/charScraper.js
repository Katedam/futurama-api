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


// module.exports = async() => {
const k = async() => {

  const allCharacters = await Promise.all(names.map(async(name) => {

    try {
      
      const characterDetails = {
        Species: 'Unknown',
        Planet: 'Unknown',
        Profession: 'Unknown',
        Status: 'Unknown',
        FirstAppearance: 'Unknown',
        PicUrl: 'https://res.cloudinary.com/teepublic/image/private/s--RisVF5Vs--/t_Preview/b_rgb:fffefe,c_limit,f_jpg,h_630,q_90,w_630/v1475865828/production/designs/720040_1.jpg',
        Relatives: 'Unknown',
        VoicedBy: 'Unknown'
      };
      
      const response = await getCharacterProfile(name);
      const html = parse(response.text);

      if(html) {
        const values = findValues(html);

        const keys = findKeys(html);

        if(keys.includes('Gender')) {
          const gender = keys.indexOf('Gender');
          keys.splice(gender, 1);
        }
        
        keys.forEach((key, i) => {
          if(key && values[i]) {
            if(name.includes('Fry')) {
              console.log('PAIR: ', key, values[i]);
            }
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

k();

