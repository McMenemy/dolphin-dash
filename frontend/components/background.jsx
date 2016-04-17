var React = require('react');
var Paper = require('material-ui/lib/paper');

var Background = React.createClass({

  render: function () {
    return (
      <Paper
        style={{
          width: '350px',
          display: 'inline-block',
          padding: '10px',
          backgroundColor: '#C5CAE9',
        }}
      >
        <h2>Background Story</h2>

        <p className='background'>
          You are a microorganism trying to make your way in the big ocean by munching on smaller microorganisms that swarm the seas. Your prey will not allow their demise easily and it will take some skillful maneuvering to catch them. However, take care not to narrow you focus too much because sometimes an even larger microorganism will patrol these waters and you may become the prey not the predator... One last warning - as the night approaches differentiating between friend and foe may not be easy.
        </p>

        <h2>Directions</h2>
          <p className="directions-item">Use arrow keys or WSAD to move</p>
          <p className="directions-item">Catch smaller microbes</p>
          <p className="directions-item">Avoid larger microbes</p>
      </Paper>
    );
  },

});

module.exports = Background;
