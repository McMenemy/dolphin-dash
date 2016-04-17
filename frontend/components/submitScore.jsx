var React = require('react');
var Paper = require('material-ui/lib/paper');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var PlayButton = require('../components/playButton');

var SubmitScore = React.createClass({

  getInitialState: function () {
    return { value: '' };
  },

  handleChange: function (e) {
    this.setState({ value: e.currentTarget.value, });
  },

  render: function () {
    return (
      <Paper
        id='modal'
        zDepth={3}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          padding: '10px',
          visibility: 'hidden',
          opacity: '0.8',
          marginLeft: '45px',
          marginTop: '-100px',
        }}
      >
        <p id='modal-text'></p>
        <TextField
          hintText="name"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <br />

        <RaisedButton
          label="Submit Score"
          onMouseDown={this.startGame}
          backgroundColor='#29B6F6'
          labelColor='#FFFFFF'
          style={ { margin: '5px', opacity: '1' } }
        />

        <PlayButton text={'play again'} />
      </Paper>
    );
  },

});

module.exports = SubmitScore;
