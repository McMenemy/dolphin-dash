var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var GameUtil = require('../util/game/util');
var Game = require('../util/game/game');
var GameView = require('../util/game/gameView');
var MovingObject = require('../util/game/MovingObject');
var Player = require('../util/game/player');
var Predator = require('../util/game/predator');
var Prey = require('../util/game/prey');

var PlayButton = React.createClass({
  startGame: function () {
    document.getElementById('modal').style.visibility = 'hidden';
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
      <RaisedButton
        label={this.props.text}
        onMouseDown={this.startGame}
        backgroundColor='#29B6F6'
        labelColor='#FFFFFF'
        style = {{
          marginTop: '10px',
          marginLeft: '15px',
        }}
      />
    );
  },

});

module.exports = PlayButton;
