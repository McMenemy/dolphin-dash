var React = require('react');

var GameCanvas = React.createClass({

  render: function () {
    return (
      <div className='center-pane'>
        <p>Score: </p>
        <p id='scoreboard'>0</p>

        <p>Game Status: </p>
        <p id='gamestatus' className='gamestatus'>game on</p>
        <p className='timer'>Timer : </p>
        <p id='timer' className='time-left'>0</p>

        <canvas id="game-canvas"></canvas>
      </div>
    );
  },

});

module.exports = GameCanvas;
