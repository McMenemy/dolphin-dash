var React = require('react');
var GameBar = require('../components/gameBar');
var Paper = require('material-ui/lib/paper');

var GameCanvas = React.createClass({

  render: function () {
    return (
      <Paper
        zDpeth={0}
        style={{
          width: '600px',
          display: 'inline-block',
        }}>

        <GameBar />

        <Paper
          zDepth={1}
          style={{
            width: 600,
            height: 600,
          }}>
          <canvas id="game-canvas"></canvas>
        </Paper>
      </Paper>
    );
  },

});

module.exports = GameCanvas;
