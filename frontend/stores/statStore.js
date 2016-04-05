var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/statConstants');

var StatStore = new Store(Dispatcher);
var _stats = {};

module.export = StatStore;
