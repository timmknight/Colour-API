var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaletteSchema = new Schema({
  title: String,
  colors: [String]
});

module.exports = mongoose.model('Palette', PaletteSchema); 
