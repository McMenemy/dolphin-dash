var HighScore = require('mongoose').model('User');

exports.create = function (req, res, next) {
  var highscore = new HighScore(req.body);

  highscore.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(highscore);
    }
  });
};
