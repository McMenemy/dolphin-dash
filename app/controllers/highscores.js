var Highscore = require('mongoose').model('Highscore');

exports.create = function (req, res, next) {
  var highscore = new Highscore(req.body);

  highscore.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(highscore);
    }
  });
};

exports.list = function (req, res, next) {
  Highscore.find({}, function (err, highscores) {
    if (err) {
      return next(err);
    } else {
      res.json(highscores);
    }
  });
};
