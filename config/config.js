module.exports = require('./env/' + process.env.NODE_ENV + '.js');

// log current enviromental mode
console.log('currently in ' + process.env.NODE_ENV + ' mode');
