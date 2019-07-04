const fs = require('fs');

fs.readFile('./characterNamesJSON.js', { encoding: 'utf8' }, (err, data) => {
  if(err) {
    return err;
  }
  try {
    console.log(data);
  } catch(e) {
    return e;
  }
});
