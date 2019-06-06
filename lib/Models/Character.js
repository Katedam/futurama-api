const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  species: String,
  planet: String,
  profession: String,
  status: String,
  firstAppearance: String,
  picUrl: String,
  relatives: String,
  voicedBy: String
});

module.exports = mongoose.model('Character', characterSchema);
