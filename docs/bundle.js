/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _contentmeter = __webpack_require__(1);

var _contentmeter2 = _interopRequireDefault(_contentmeter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myContentmeter = new _contentmeter2.default('#content_meter', '#content_container', {
  invisibilityClass: false
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(2);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contentmeter = function () {
  function Contentmeter(barSelector, contentSelector) {
    _classCallCheck(this, Contentmeter);

    this.barSelector = barSelector;
    this.contentSelector = contentSelector;

    this.init();
  }

  _createClass(Contentmeter, [{
    key: 'updateClasses',
    value: function updateClasses() {
      if (_utilities2.default.getDocScrolltop() > this.content.height + this.content.offset || _utilities2.default.getDocScrolltop() + this.content.visibleHeight < this.content.offset) {

        this.barContainer.classList.add('js-invisible');
      } else {
        this.barContainer.classList.remove('js-invisible');
      }
    }
  }, {
    key: 'getBarWidth',
    value: function getBarWidth() {
      var barW = 0;
      if (!this.content) {
        this.readContentDimensions();
      }

      barW = ((this.content.selfScrolled ? this.contentContainer.scrollTop : _utilities2.default.getDocScrolltop()) + this.content.barBasicVal) / this.content.height * 100;

      return _utilities2.default.limitTheNumber(barW, 0, 100);
    }
  }, {
    key: 'setBarWidth',
    value: function setBarWidth() {
      this.bar.style.width = this.getBarWidth() + '%';
    }
  }, {
    key: 'setCounterValue',
    value: function setCounterValue() {
      this.counter.textContent = Math.ceil(this.getBarWidth());
    }
  }, {
    key: 'readContentDimensions',
    value: function readContentDimensions() {
      this.content = this.content || {};

      this.content.selfScrolled = this.contentContainer.scrollHeight > this.contentContainer.clientHeight;

      this.content.height = this.contentContainer.scrollHeight;
      this.content.visibleHeight = Math.min(window.innerHeight, this.contentContainer.clientHeight);
      this.content.offset = this.content.selfScrolled ? 0 : this.contentContainer.offsetTop;
      this.content.barBasicVal = this.content.offset * -1 + this.content.visibleHeight;

      console.log(this.content);
    }
  }, {
    key: 'bindUIEvents',
    value: function bindUIEvents() {
      var _this = this;

      var scrollTarget = this.content.selfScrolled ? this.contentContainer : window;
      scrollTarget.addEventListener('scroll', function () {
        _this.setBarWidth();
        _this.setCounterValue();
      });

      window.addEventListener('scroll', function () {
        return _this.updateClasses();
      });
      window.addEventListener('resize', function () {
        _this.readContentDimensions();
        _this.setBarWidth();
        _this.setCounterValue();
        _this.updateClasses();
      });
    }
  }, {
    key: 'createMeter',
    value: function createMeter() {
      var _this2 = this;

      _utilities2.default.createDOMElement('div', 'contentmeter__bar', this.barContainer, function (element) {
        _this2.bar = element;
        _this2.setBarWidth();
      });

      _utilities2.default.createDOMElement('div', 'contentmeter__counter', this.barContainer, function (element) {
        _this2.counter = element;
        _this2.setCounterValue();
      });

      this.updateClasses();
      this.bindUIEvents();
    }
  }, {
    key: 'init',
    value: function init() {
      this.barContainer = _utilities2.default.getDOMElement(this.barSelector);
      this.contentContainer = _utilities2.default.getDOMElement(this.contentSelector);

      if (this.barContainer !== null && this.contentContainer !== null) {
        this.readContentDimensions();
        this.createMeter();
      } else {
        throw new Error('Wrong selectors or given selectors match no elements.');
      }
    }
  }]);

  return Contentmeter;
}();

exports.default = Contentmeter;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: 'getDOMElement',
    value: function getDOMElement(selector) {
      var element = null;

      if (typeof selector === 'string' && selector.indexOf('#') !== -1 && selector.indexOf('#') === 0) {
        element = document.getElementById(selector.slice(1));
      } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.nodeType !== undefined && selector.length === undefined) {
        element = selector;
      }

      return element;
    }
  }, {
    key: 'createDOMElement',
    value: function createDOMElement(element, className, parent, callback) {
      var DOMElement = document.createElement(element);
      DOMElement.classList.add(className);

      if (parent) {
        parent.appendChild(DOMElement);
      }

      if (callback) {
        callback(DOMElement);
      }

      return DOMElement;
    }
  }, {
    key: 'getDocScrolltop',
    value: function getDocScrolltop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  }, {
    key: 'limitTheNumber',
    value: function limitTheNumber(theNumber, min, max) {
      return theNumber > min ? theNumber < max ? theNumber : max : min;
    }
  }]);

  return Utilities;
}();

exports.default = Utilities;
module.exports = exports['default'];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map