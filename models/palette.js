var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaletteSchema = new Schema({
  title:  String,
  colors: [],
  likes:  { type: Number, default: 0 }
});

module.exports = mongoose.model('Palette', PaletteSchema);
