/* eslint-disable no-undef */
/* eslint-disable no-console*/

const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const connection = require('./middleware/connection');
const quotes = require('./routes/routes');
const cors = require('cors');
const expressGa = require('express-ga-middleware');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(expressGa('UA-XXXXXX-X'));
app.use(express.json());
app.use(cors());
app.use('/api', connection, quotes);

app.use(express.static(__dirname + '/Public'));
app.use('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
  next();
});

app.use(notFound);
app.use(handler);

module.exports = app;
