/* Allow to work with electron API */
window.storage = require('electron-json-storage');
window.remote = require('remote');
window.app = remote.app;
