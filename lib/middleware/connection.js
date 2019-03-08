/* eslint-disable no-undef */
const state = require('mongoose/lib/connectionstate');
const { HttpError } = require('./error');
const mongoose = require('mongoose');


module.exports = (req, res, next) => {
  const readyState = mongoose.connection.readyState;
  if(readyState === state.connected || readyState === state.connecting) {
    next();
  } else {
    next(new HttpError(500, 'MongoDB not connected'));
  }
};
