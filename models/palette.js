var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaletteSchema = new Schema({
  title:  String,
  color1: String,
  color2: String,
  color3: String,
  color4: String,
  colors: [String, String, String, String],
  colorarr: [String],
  likes:  { type: Number, default: 0 }
});

module.exports = mongoose.model('Palette', PaletteSchema);
