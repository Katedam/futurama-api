const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  character: String,
  quote: String,
  img: String
});

quoteSchema.statics.getRandomQuotes = function(count) {
  return this.aggregate([
    { $sample: { size: Number(count) } }
  ]);
};

quoteSchema.statics.getRandomQuotesByCharacter = function(char, count) {
  return this.aggregate([
    { $match: { character: char } },
    { $sample: { size: Number(count) } }
  ]);
};



module.exports = mongoose.model('Quote', quoteSchema);
