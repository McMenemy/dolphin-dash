var mongoose = require('mongoose');
var Paper = require('material-ui/lib/paper');

var HighScoreSchema = new Schema({
  username: String,
  score: Number,
});

mongoose.model('HighScore', HighScoreSchema);
