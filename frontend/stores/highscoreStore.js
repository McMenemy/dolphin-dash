var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/statConstants');

var HighscoreStore = new Store(Dispatcher);
var _highscores = {};

module.export = HighscoreStore;
