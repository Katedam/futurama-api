require('dotenv').config();
require('../utils/connect')();

const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');
const Quote = require('../Models/Quote');

describe('routes', () => {
  const createQuote = (character, quote = 'you can kiss my shiny ass', image = 'animageUrl') => {
    return Quote.create({ character, quote, image })
      .then(quote => ({
        ...quote, 
        _id: quote.id.toString() 
      }));
  };

  beforeEach(done => mongoose.connection.dropDatabase(() => done()));

  beforeEach(() => {
    return Promise.all(['Bender', 'Giant Bender', 'Bender', 'Professor Farnsworth', 'Fry', 'Fry', 'Leela', 'Leela', 'Leela'].map(quote => createQuote(quote)));
  });

  afterAll(done => {
    mongoose.connection.close(() => done());
  });

  it('returns a list of all quotes', done => {
    return request(app)
      .get('/api/quotes')
      .then(res => {
        expect(res.body).toHaveLength(9);
        expect(res.body).toEqual([
          {
            character: 'Bender',
            quote: 'you can kiss my shiny ass',        
            image: 'animageUrl'
          },
          {
            character: 'Giant Bender',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Bender',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Professor Farnsworth',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Fry',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Fry',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Leela',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Leela',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          },
          {
            character: 'Leela',
            quote: 'you can kiss my shiny ass',
            image: 'animageUrl'
          }
        ]);
        done();
      });
  });

  it('returns quote based on :count 1 param given to url', done => {
    return request(app)
      .get('/api/quotes/1')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{
          character: expect.any(String),
          quote: expect.any(String),        
          image: expect.any(String)
        }]);
        done();
      });
  });

  it('returns quote(s) based on :count 2 param given to url', done => {
    return request(app)
      .get('/api/quotes/2')
      .then(res => {
        expect(res.body).toHaveLength(2);
        expect(res.body).toEqual([
          {
            character: expect.any(String),
            quote: expect.any(String),        
            image: expect.any(String)
          },
          {
            character: expect.any(String),
            quote: expect.any(String),        
            image: expect.any(String)
          }
        ]);
        done();
      });
  });

  it('returns all quotes belonging to a specific character', done => {     
    return request(app)
      .get('/api/characters/leela')
      .then(res => {
        expect(res.body[0].character).toEqual('Leela');
        expect(res.body[1].character).toEqual('Leela');
        expect(res.body[2]).toEqual({
          character: 'Leela',
          quote: expect.any(String),
          image: expect.any(String)
        });
        done();
      });
  });

  it('returns quote(s) based on :count 3 param given to url', done => {
    return request(app)
      .get('/api/characters/bender/2')
      .then(res => {
        expect(res.body).toHaveLength(2);
        expect(res.body).toEqual([
          {
            character: 'Bender',
            quote: expect.any(String),
            image: expect.any(String)
          },
          {
            character: 'Bender',
            quote: expect.any(String),
            image: expect.any(String)
          }
        ]);
        done();
      });
  });
});
