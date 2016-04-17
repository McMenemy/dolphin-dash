var React = require('react');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var Separator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var Paper = require('material-ui/lib/paper');
var PlayButton = require('../components/playButton');

var GameBar = React.createClass({

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
            text="20"
            style={{
              color: '#FFFFFF',
            }}
          />
          <Separator style={{
              backgroundColor: '#FFFFFF',
            }}/>
        </ToolbarGroup>

        <ToolbarGroup>
          <PlayButton text={'Play Game'} />
        </ToolbarGroup>

      </Toolbar>
    );
  },

});

module.exports = GameBar;
