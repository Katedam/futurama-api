/* eslint-disable no-undef */
/* eslint-disable no-console*/

const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const quotes = require('./routes/routes');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use('/', connection, quotes);

app.use(notFound);

app.use(handler);

module.exports = app;
