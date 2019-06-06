/* eslint-disable no-unused-vars */
const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {

  return request.get('http://www.parseerror.com/pizza/futurama/')
    .then(res => res.text)
    .then(parse)
    .then(findPairs)
    .then(returnQuotes);
};

const findQuotes = html => html.querySelectorAll('.qt'); 
const findCharacters = html => html.querySelectorAll('.n');

const findPairs = html => [findQuotes(html), findCharacters(html)];

const returnQuotes = ([quotes, characters])=> quotes.map((quote, i) => {
  return {
    character: characters[i].text.trim(),
    quote: quote.text.trim()
  };
});
