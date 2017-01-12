/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _contentmeter = __webpack_require__(1);

	var _contentmeter2 = _interopRequireDefault(_contentmeter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ContentMeter = function ContentMeter(barSelector, contSelector, options) {

		this.barSelector = barSelector;
		this.contSelector = contSelector;

		this.options = options;
		this.settings = {
			invisibilityClass: true
		};

		this.init();
	};

	ContentMeter.prototype = {

		init: function init() {
			var base = this,
			    options = base.options,
			    settings = base.settings;

			function getDOMElement(selector) {
				var element;

				if (typeof selector === "string" && selector.indexOf("#") !== -1 && selector.indexOf("#") === 0) {

					element = document.getElementById(selector.slice(1));
				} else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object" && selector.nodeType !== undefined && selector.length === undefined) {

					element = selector;
				} else {
					element = null;
				}

				return element;
			}

			base.barContainer = getDOMElement(base.barSelector);
			base.contContainer = getDOMElement(base.contSelector);

			for (var option in options) {
				settings[option] = options[option];
			}

			// If exclusive options set to true, leave only first one enabled
			// if (settings.barByWidth && settings.barByPosition) settings.barByPosition = false;

			if (base.barContainer !== null && base.contContainer !== null) {
				base.readContentDimensions();
				base.createMeter();
			} else {
				throw new Error("Wrong selectors or given selectors match no elements.");
			}
		},

		createMeter: function createMeter() {
			var base = this,
			    bar;

			base.barContainer.style.overflow = "hidden";

			bar = document.createElement("div");
			bar.classList.add("contentmeter-bar");

			if (!base.content.selfScrolled) {
				bar.style.width = base.getBarWidth() + "%";
			} else {
				bar.style.width = base.getBarWidth2() + "%";
			}

			if (base.settings.invisibilityClass) {
				base.updateClasses();
			}

			base.bar = bar;
			base.barContainer.appendChild(bar);

			base.bindUIEvents();
		},

		bindUIEvents: function bindUIEvents() {
			var base = this,
			    bar = base.bar;

			if (!base.content.selfScrolled) {
				window.addEventListener("scroll", function () {
					bar.style.width = base.getBarWidth() + "%";
				});
			} else {
				base.contContainer.addEventListener("scroll", function () {
					bar.style.width = base.getBarWidth2() + "%";
				});

				if (base.settings.invisibilityClass) {
					window.addEventListener("scroll", function () {
						base.updateClasses();
					});
				}
			}

			window.addEventListener("resize", function () {
				base.readContentDimensions();
				bar.style.width = base.getBarWidth() + "%";
				if (base.settings.invisibilityClass) {
					base.updateClasses();
				}
			});
		},

		getDocScrolltop: function getDocScrolltop() {
			return document.documentElement.scrollTop || document.body.scrollTop;
		},

		readContentDimensions: function readContentDimensions() {
			var base = this;

			base.content = {
				height: base.contContainer.scrollHeight,
				visibleHeight: base.contContainer.clientHeight,
				offset: base.contContainer.offsetTop,
				selfScrolled: false
			};

			if (base.content.visibleHeight > window.innerHeight) {
				base.content.visibleHeight = window.innerHeight;
			} else {
				base.content.selfScrolled = true;
			}

			// base.content.visibleHeight =
			// 	base.content.visibleHeight > window.innerHeight ?
			// 		window.innerHeight : base.content.visibleHeight;
		},

		checkLimit: function checkLimit(limited, min, max) {
			var number = limited;

			number = number > min ? number : min;
			number = number < max ? number : max;

			return number;
		},

		getBarWidth: function getBarWidth() {
			var base = this,
			    barW = 0;

			if (!base.content) {
				base.readContentDimensions();
			}

			barW = (base.getDocScrolltop() - base.content.offset + base.content.visibleHeight) / base.content.height * 100;

			barW = base.checkLimit(barW, 0, 100);

			console.log(base.content);

			return barW;
		},

		getBarWidth2: function getBarWidth2() {
			var base = this,
			    barW = 0;

			if (!base.content) {
				base.readContentDimensions();
			}

			barW = (base.contContainer.scrollTop + base.content.visibleHeight) / base.content.height * 100;

			barW = base.checkLimit(barW, 0, 100);

			return barW;
		},

		updateClasses: function updateClasses() {
			var base = this;

			if (base.getDocScrolltop() > base.content.height + base.content.offset || base.getDocScrolltop() + base.content.visibleHeight < base.content.offset) {

				base.barContainer.classList.add("invisible");
			} else {
				base.barContainer.classList.remove("invisible");
			}
		}
	};

	exports.default = ContentMeter;

/***/ }
/******/ ]);