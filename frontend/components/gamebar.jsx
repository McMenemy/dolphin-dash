var React = require('react');
var PlayButton = require('../components/playButton');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var Separator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var RaisedButton = require('material-ui/lib/raised-button');
var Paper = require('material-ui/lib/paper');
var Game = require('../util/game/game');
var GameView = require('../util/game/gameView');
var MovingObject = require('../util/game/MovingObject');
var Player = require('../util/game/player');
var Predator = require('../util/game/predator');
var Prey = require('../util/game/prey');
var GameUtil = require('../util/game/util');

var GameBar = React.createClass({
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
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Score" />
          <ToolbarTitle id="scoreboard" text="0" />
          <Separator />
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarTitle text="Time" />
          <ToolbarTitle id="timer" text="45" />
        </ToolbarGroup>

        <ToolbarGroup>
          <RaisedButton
            label="Play Game"
            onMouseDown={this.startGame}
          />
        </ToolbarGroup>

      </Toolbar>
    );
  },

});

module.exports = GameBar;
