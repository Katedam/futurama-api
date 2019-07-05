require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');
const Character = require('../Models/Character');

describe('character routes', () => {
  const createChar = (Name, Planet = 'earth', Species = 'unknown', Profession = 'Delivery Boy', Status = 'Alive', FirstAppearance = 'Episode 300', PicUrl = 'some image url', Relatives = 'mom, dad, brother', VoicedBy = 'some dude') => { 
    return Character.create({
      Name,
      Planet,
      Profession,
      Status,
      FirstAppearance,
      PicUrl,
      Relatives,
      VoicedBy,
      Species
    })
      .then(character => ({
        ...character,
        _id: character.id.toString()
      }));
  };

  beforeEach(done => mongoose.connection.dropDatabase(() => done()));
  
  beforeEach(() => {
    return Promise.all(['Fry', 'Bender', 'Fry'].map(character => createChar(character)));
  });

  afterAll(done => {
    mongoose.connection.close(() => done());
  });

  it('returns a list of all characters', done => {
    return request(app)
      .get('/api/v2/characters')
      .then(res => {
        expect(res.body).toHaveLength(3);
        expect(res.body).toEqual([
          {
            Name: 'Fry',
            Planet: 'earth', 
            Species: 'unknown', Profession: 'Delivery Boy', Status: 'Alive', FirstAppearance: 'Episode 300', 
            PicUrl: 'some image url', Relatives: 'mom, dad, brother', 
            VoicedBy: 'some dude'
          },
          {
            Name: 'Bender',
            Planet: 'earth', 
            Species: 'unknown', Profession: 'Delivery Boy', Status: 'Alive', FirstAppearance: 'Episode 300', 
            PicUrl: 'some image url', Relatives: 'mom, dad, brother', 
            VoicedBy: 'some dude'
          },
          {
            Name: 'Fry',
            Planet: 'earth', 
            Species: 'unknown', Profession: 'Delivery Boy', Status: 'Alive', FirstAppearance: 'Episode 300', 
            PicUrl: 'some image url', Relatives: 'mom, dad, brother', 
            VoicedBy: 'some dude'
          }
        ]);
        done();
      });
  });

  it('returns a list of all characters whos name matches a search query', done => {
    return request(app)
      .get('/api/v2/characters?search=bend')
      .then(res => {
        expect(res.body).toEqual([{
          Name: 'Bender',
          Planet: 'earth',
          Profession: 'Delivery Boy',
          Status: 'Alive',
          FirstAppearance: 'Episode 300',
          PicUrl: 'some image url',
          Relatives: 'mom, dad, brother',
          VoicedBy: 'some dude',
          Species: 'unknown'
        }]);
        done();
      });
  });

});
