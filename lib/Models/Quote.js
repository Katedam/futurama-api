const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  character: String,
  quote: String,
  image: String
});

quoteSchema.statics.getRandomQuotes = function(count) {
  return this.aggregate([
    { $sample: { size: Number(count) } },
    { $project: { _id: false, __v: false } }
  ]);
};

quoteSchema.statics.getRandomQuotesByCharacter = function(char, count) {
  return this.aggregate([
    { $match: { character: formatChar(char) } },
    { $sample: { size: Number(count) } },
    { $project: { _id: false, __v: false } }
  ]);
};

const formatChar = char => {
  return char.replace(/\w+/, x => {
    return x.substr(0, 1).toUpperCase() + x.substr(1)
      .toLowerCase();
  });
};

module.exports = mongoose.model('Quote', quoteSchema);
