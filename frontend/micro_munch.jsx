var React = require('react');
var ReactDOM = require('react-dom');
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
    <Router>{routes}</Router>, root
    );
});
