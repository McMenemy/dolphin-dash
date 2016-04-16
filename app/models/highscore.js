var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HighScoreSchema = new Schema({
  username: String,
  score: Number,
});

mongoose.model('HighScore', HighScoreSchema);
