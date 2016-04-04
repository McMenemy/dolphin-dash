process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port ' + (process.env.PORT || 3000) + '...');
});

module.exports = app;
