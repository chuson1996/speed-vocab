(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global angular*/

'use strict';

var _controllersJs = require('./controllers.js');

var _factoriesJs = require('./factories.js');

angular.module('speedvocab.directives', []);

_controllersJs.BootstrapControllers(angular.module('speedvocab.controllers', []));
_factoriesJs.BootstrapFactories(angular.module('speedvocab.factories', []));

angular.module('speedvocab', [
// 3rd parties
'btford.socket-io',

// local
'speedvocab.controllers', 'speedvocab.factories', 'speedvocab.directives']);

},{"./controllers.js":2,"./factories.js":4}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.BootstrapControllers = BootstrapControllers;

var _controllersMainJs = require('./controllers/main.js');

function BootstrapControllers(controllerModule) {
    controllerModule.controller('MainController', _controllersMainJs.MainController);
}

},{"./controllers/main.js":3}],3:[function(require,module,exports){
/*global angular*/

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainController = function MainController(socket) {
    _classCallCheck(this, MainController);

    socket.on('news', function (data) {
        console.log(data);
    });
};

exports.MainController = MainController;

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.BootstrapFactories = BootstrapFactories;

var _factoriesSocketJs = require('./factories/socket.js');

function BootstrapFactories(factoryModule) {
    factoryModule.factory('socket', _factoriesSocketJs.socket);
}

},{"./factories/socket.js":5}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.socket = socket;

function socket(socketFactory) {
    return socketFactory();
}

},{}]},{},[1]);
