const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  Name: String,
  Age: String,
  Species: String,
  Planet: String,
  Profession: String,
  Status: String,
  FirstAppearance: String,
  PicUrl: String,
  Relatives: String,
  VoicedBy: String
});

module.exports = mongoose.model('Character', characterSchema);
