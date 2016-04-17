var React = require('react');
var Paper = require('material-ui/lib/paper');

var HighScores = React.createClass({

  render: function () {
    return (
      <Paper
        style={{
          width: '350px',
          display: 'inline-block',
          padding: '10px',
          marginTop: '15px',
          backgroundColor: '#3F51B5',
          color: 'white',
        }}
      >

      <h2>High Scores</h2>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
        <p className="directions-item">feature coming soon</p>
      </Paper>
    );
  },

});

module.exports = HighScores;
