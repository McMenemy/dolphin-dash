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
          float: 'right',
          display: 'inline-block',
        }}
      >

        <GameBar />

        <Paper
          zDepth={1}
          style={{
            width: '60%',
            height: '600px',
          }}
        >
          <canvas id="game-canvas"></canvas>
        </Paper>
      </Paper>
    );
  },

});

module.exports = GameCanvas;
