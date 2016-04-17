var highscores = require('../controllers/highscores');

module.exports = function (app) {
  app.route('/highscores').post(highscores.create);
  app.route('/highscores').get(highscores.list);
};
