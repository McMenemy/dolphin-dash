var Dispatcher = require('../dispatcher/dispatcher');
var HighscoreConstants = require('../constants/HighscoreConstants');
var ApiUtil = require('../util/apiUtil');

var statActions = {
  receiveTopHighscores: function (data) {
    Dispatcher.dispatch({
      actionType: HighscoreConstants.TOP_HIGHSCORES_RECEIVED,
      highscores: data,
    });
  },

  retrieveTopHighscores: function () {
    ApiUtil.fetchTopOptimizations(this.receiveTopHighscores);
  },

  receiveOneHighscore: function (data) {
    Dispatcher.dispatch({
      actionType: HighscoreConstants.ONE_HIGHSCORE_RECEIVED,
      highscore: data,
    });
  },
};

module.exports = statActions;
