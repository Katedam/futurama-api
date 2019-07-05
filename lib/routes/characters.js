const Character = require('../Models/Character');
const { Router } = require('express');

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
