var React = require('react');
var Paper = require('material-ui/lib/paper');

var Background = React.createClass({

  render: function () {
    return (
      <Paper
        style={{
          width: '325px',
          float: 'left',
          padding: '10px',
        }}>

        <p className='background'>
          You are a microorganism trying to make your way in the big ocean by munching on smaller microorganisms that swarm the seas. Your prey will not allow their demise easily and it will take some skillful maneuvering to catch them. However, take care not to narrow you focus too much because sometimes an even larger microorganism will patrol these waters and you may become the prey not the predator... One last warning - as the night approaches differentiating between friend and foe may not be easy.
        </p>

        <h2>Directions</h2>
          <ul>
            <li>Use WSAD to increase your speed in that direction</li>
            <li>Eat the prey for points</li>
            <li>Don't get caught by the predator</li>
          </ul>
      </Paper>
    );
  },

});

module.exports = Background;
