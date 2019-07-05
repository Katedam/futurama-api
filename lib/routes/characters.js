const Character = require('../Models/Character');
// const Quote = require('../Models/Character');
const { Router } = require('express');

// const getQuotes = (name) => {
//   const query = {};
//   if(name) {
//     query.character = {
//       $regex: new RegExp(name, 'i')
//     };
//   }
//   Quote
//     .find(query)
//     .select({ __v: false })
//     .then(quotes => quotes);
// };

module.exports = Router()

  .get('/characters', (req, res, next) => {
    const query = {};
    const { page = 1, perPage = 20, search } = req.query;

    if(search) {
      query.Name = {
        $regex: new RegExp(search, 'i')
      };
    }

    Character
      .find(query)
      .skip(+perPage * (+page - 1))
      .limit(+perPage)
      .select({ __v: false, _id: false })
      .then(characters => res.send(characters))
      .catch(next);
  });
