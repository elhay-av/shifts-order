/* globals window:false, require:false */
/* Allow to work with electron API */
var storage = require('electron-json-storage');
var remote = require('remote');
var app = remote.app;

window.storage = storage;
window.remote = remote;
window.app = app;
