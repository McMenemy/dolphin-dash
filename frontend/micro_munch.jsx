var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var StatActions = require('./actions/statActions');
var StatStore = require('./stores/statStore');
var StatStore = require('./stores/statStore');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

// components
var App = require('./components/app');

// routes
var routes = (
  <Route component={App} path='/'>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {

  ReactDOM.render(
    <Router>{routes}</Router>, document.getElementById('root')
    );
});
