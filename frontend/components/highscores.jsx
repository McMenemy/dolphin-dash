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

      <h2>Directions</h2>
        <p className="directions-item">Use WSAD to move</p>
        <p className="directions-item">Catch smaller microbes</p>
        <p className="directions-item">Avoid larger microbes</p>
      </Paper>
    );
  },

});

module.exports = HighScores;
