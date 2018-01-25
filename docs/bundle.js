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

var myContentmeter = new _contentmeter2.default({
  barSelector: '#content_meter',
  contentSelector: '#content_container'
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
  function Contentmeter() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Contentmeter);

    this.settings = {
      barSelector: '#content_meter',
      contentSelector: '#content_container'
    };

    Object.keys(options).forEach(function (option) {
      _this.settings[option] = options[option];
    });

    this.barContainer = document.querySelector(this.settings.barSelector);
    this.contentContainer = document.querySelector(this.settings.contentSelector);

    if (this.barContainer !== null && this.contentContainer !== null) {
      this.readContentDimensions();
      this.createMeter();
    } else {
      throw new Error('Wrong selectors or given selectors match no elements.');
    }
  }

  _createClass(Contentmeter, [{
    key: 'readContentDimensions',
    value: function readContentDimensions() {
      this.content = this.content || {};

      this.content.selfScrolled = this.contentContainer.scrollHeight > this.contentContainer.clientHeight;

      this.content.height = this.contentContainer.scrollHeight;
      this.content.visibleHeight = Math.min(window.innerHeight, this.contentContainer.clientHeight);
      this.content.offset = this.content.selfScrolled ? 0 : this.contentContainer.offsetTop;
      this.content.barBasicVal = -1 * this.content.offset + this.content.visibleHeight;
    }
  }, {
    key: 'calcBarScale',
    value: function calcBarScale() {
      if (!this.content) {
        this.readContentDimensions();
      }

      var containerScrollTop = this.content.selfScrolled ? this.contentContainer.scrollTop : _utilities2.default.getDocScrolltop();
      var barW = (containerScrollTop + this.content.barBasicVal) / this.content.height;

      return _utilities2.default.limitTheNumber(barW, 0, 1);
    }
  }, {
    key: 'setBarWidth',
    value: function setBarWidth() {
      this.bar.style.transform = 'scale(' + this.calcBarScale() + ', 1)';
    }
  }, {
    key: 'setCounterValue',
    value: function setCounterValue() {
      this.counter.textContent = '' + Math.ceil(this.calcBarScale() * 100);
    }
  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      this.readContentDimensions();
      this.setBarWidth();
      this.setCounterValue();
    }
  }, {
    key: 'scrollHandler',
    value: function scrollHandler() {
      this.setBarWidth();
      this.setCounterValue();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      var scrollTarget = this.content.selfScrolled ? this.contentContainer : window;

      scrollTarget.addEventListener('scroll', function () {
        return _this2.scrollHandler();
      });
      window.addEventListener('resize', function () {
        return _this2.resizeHandler();
      });
    }
  }, {
    key: 'createMeter',
    value: function createMeter() {
      var _this3 = this;

      _utilities2.default.createDOMElement('div', 'contentmeter__bar', this.barContainer, function (element) {
        _this3.bar = element;
        _this3.setBarWidth();
      });

      _utilities2.default.createDOMElement('div', 'contentmeter__counter', this.barContainer, function (element) {
        _this3.counter = element;
        _this3.setCounterValue();
      });

      this.bindEvents();
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = function () {
  function Utilities() {
    _classCallCheck(this, Utilities);
  }

  _createClass(Utilities, null, [{
    key: "createDOMElement",
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
    key: "getDocScrolltop",
    value: function getDocScrolltop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  }, {
    key: "limitTheNumber",
    value: function limitTheNumber(theNumber, min, max) {
      return theNumber > min ? theNumber < max ? theNumber : max : min;
    }
  }]);

  return Utilities;
}();

exports.default = Utilities;
module.exports = exports["default"];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map