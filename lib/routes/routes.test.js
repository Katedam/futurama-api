require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');
const Quote = require('../Models/Quote');

describe('routes', () => {
  beforeEach(done => mongoose.connection.dropDatabase(() => done()));

  afterAll(done => {
    mongoose.connection.close(() => done());
  });

  const createQuote = (character, quote = 'you can kiss my shiny ass') => {
    return Quote.create({ character, quote, })
      .then(quote => ({
        ...quote, 
        _id: quote.id.toString() 
      }));
  };

  it('returns a list of all quotes', done => {
    return Promise.all(['bender', 'bender'].map(quote => createQuote(quote)))
      .then(() => {
        return request(app)
          .get('/');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
        done();
      });
  });

  it('returns quote based on :count 1 param given to url', done => {
    return Promise.all(['bender', 'bender'].map(quote => createQuote(quote)))
      .then(() => {
        return request(app)
          .get('/1');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        done();
      });
  });

  it('returns quote(s) based on :count 2 param given to url', done => {
    return Promise.all(['bender', 'bender'].map(quote => createQuote(quote)))
      .then(() => {
        return request(app)
          .get('/2');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
        done();
      });
  });

  it('returns quote(s) based on :count 3 param given to url', done => {
    return Promise.all(['bender', 'bender', 'bender'].map(quote => createQuote(quote)))
      .then(() => {
        return request(app)
          .get('/3');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
        done();
      });
  });
});
