var React = require('react');
var GameCanvas = require('../components/gameCanvas');
var Background = require('../components/background');
var HighScores = require('../components/highscores');
var SubmitScore = require('../components/submitScore');
var Paper = require('material-ui/lib/paper');

var App = React.createClass({

  render: function () {
    return (
      <div className="container">
        <Paper
          zDepth={0}
          style={{
            width: '350px',
            float: 'left',
            clear: 'both',
          }}
        >
          <Background />
          <HighScores />
        </Paper>
        <GameCanvas />
        <SubmitScore />
      </div>
    );
  },

});

module.exports = App;
