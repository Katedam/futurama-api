const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  character: String,
  quote: String,
  img: String
});

module.exports = mongoose.model('Quote', quoteSchema);
