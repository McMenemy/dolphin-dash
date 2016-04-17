var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HighscoreSchema = new Schema({
  username: String,
  score: Number,
});

mongoose.model('Highscore', HighscoreSchema);
