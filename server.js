process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port ' + (process.env.PORT || 3000) + '...');
});

module.exports = app;
