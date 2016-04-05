var React = require('react');
var Game = require('../util/game/game');
var GameView = require('../util/game/gameView');
var MovingObject = require('../util/game/MovingObject');
var Player = require('../util/game/player');
var Predator = require('../util/game/predator');
var Prey = require('../util/game/prey');
var GameUtil = require('../util/game/util');

var PlayButton = React.createClass({
  startGame: function () {
    var canvas = document.getElementById('game-canvas');
    canvas.width = 600;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    this.runScripts();
    var game = new MicroMunch.Game();

    new MicroMunch.GameView(game, ctx).start();
  },

  runScripts: function () {
    // kind of a hack because originally the game logic was a bunch of IIFEs and just HTML
    GameUtil();
    MovingObject();
    Prey();
    Player();
    Predator();
    Game();
    GameView();
  },

  render: function () {
    return (
      <button className="play-button" onClick={this.startGame}>play game</button>
    );
  },

});

module.exports = PlayButton;
