const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  character: String,
  quote: String,
  img: String
});

quoteSchema.statics.getRandomQuotes = function(count) {
  // const intCount = Number(count);
  return this.aggregate([{ $sample: { size: Number(count) } }]);
};

module.exports = mongoose.model('Quote', quoteSchema);
