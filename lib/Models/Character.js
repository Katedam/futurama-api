const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  Name: String,
  Species: String,
  Planet: String,
  Profession: String,
  Status: String,
  Firstappearance: String,
  PicUrl: String,
  Relatives: String,
  Voicedby: String
});

module.exports = mongoose.model('Character', characterSchema);
