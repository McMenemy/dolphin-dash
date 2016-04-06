var React = require('react');
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
      <Toolbar
        style={{
          backgroundColor: '#3F51B5',
        }}>
        <ToolbarGroup>
          <ToolbarTitle
            text="Score"
            style={{
              color: '#FFFFFF',
            }}
          />
          <ToolbarTitle
            id="scoreboard"
            text="0"
            style={{
              color: '#FFFFFF',
            }}
          />
        <Separator style={{
            backgroundColor: '#FFFFFF',
            margin: '0px 10px 0px 0px',
          }}/>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarTitle
            text="Time"
            style={{
              color: '#FFFFFF',
            }}
          />
          <ToolbarTitle
            id="timer"
            text="45"
            style={{
              color: '#FFFFFF',
            }}
          />
          <Separator style={{
              backgroundColor: '#FFFFFF',
            }}/>
        </ToolbarGroup>

        <ToolbarGroup>
          <RaisedButton
            label="Play Game"
            onMouseDown={this.startGame}
            backgroundColor='#29B6F6'
            labelColor='#FFFFFF'
          />
        </ToolbarGroup>

      </Toolbar>
    );
  },

});

module.exports = GameBar;
