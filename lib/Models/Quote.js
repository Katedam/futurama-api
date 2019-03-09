const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  character: String,
  quote: String,
  image: String
});

quoteSchema.statics.getRandomQuotes = function(count) {
  return this.aggregate([
    { $sample: { size: Number(count) } },
    { $project: { __v: false, _id: false } }
  ]);
};

quoteSchema.statics.getRandomQuotesByCharacter = function(char, count) {
  return this.aggregate([
    { $match: { character: formatChar(char) } },
    { $sample: { size: Number(count) } },
    { $project: { __v: false, _id: false } }
  ]);
};

const formatChar = char => {
  return char.replace(/\w+/, str => {
    return str.substr(0, 1).toUpperCase() + str.substr(1)
      .toLowerCase();
  });
};

module.exports = mongoose.model('Quote', quoteSchema);
