/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3333/react/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!****************************************!*\
  !*** ./src/assets/scripts/app/_app.js ***!
  \****************************************/
/***/ function(module, exports) {

	'use strict';
	
	var app = angular.module('App', ['react']);
	
	app.controller('mainCtrl', function ($scope) {
	  $scope.compare = {
	    assurance: "There is no doubt,",
	    contender: "Sheep"
	  };
	});
	
	app.value("Greatest", React.createClass({
	  propTypes: {
	    assurance: React.PropTypes.string.isRequired
	  },
	
	  render: function render() {
	    return React.DOM.span(null, this.props.assurance + ' Cows are the best animal ever.');
	  }
	}));
	
	app.value("NearBest", React.createClass({
	  propTypes: {
	    contender: React.PropTypes.string.isRequired
	  },
	
	  render: function render() {
	    return React.DOM.span(null, this.props.contender + ' are almost as cool... but could never pass cows... ever.');
	  }
	}));
	
	app.directive('greatest', function (reactDirective) {
	  return reactDirective('Greatest');
	});
	
	app.directive('near', function (reactDirective) {
	  return reactDirective('NearBest');
	});

/***/ }
/******/ ]);
//# sourceMappingURL=compiled_react_app.js.map