var highscores = require('../../controllers/highscores');

module.exports = function (app) {
  app.route('/users').post(users.create);
};
