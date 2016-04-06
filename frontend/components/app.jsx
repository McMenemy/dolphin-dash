var React = require('react');
var GameCanvas = require('../components/gameCanvas');
var Background = require('../components/background');
var Scoreboard = require('../components/scoreboard');

var App = React.createClass({

  render: function () {
    return (
      <div className="container">
        <Background />
        <GameCanvas />
      </div>
    );
  },

});

module.exports = App;
