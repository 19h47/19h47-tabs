(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TabulationEverywhere"] = factory();
	else
		root["TabulationEverywhere"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabulationEverywhere; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Utils_getHighestHeight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utils/getHighestHeight */ "./src/utils/getHighestHeight.js");
/* harmony import */ var Utils_getHash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utils/getHash */ "./src/utils/getHash.js");





var TabulationEverywhere =
/*#__PURE__*/
function () {
  function TabulationEverywhere(element) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TabulationEverywhere);

    this.$cont = element;
    this.$nav = this.$cont.querySelector('.js-nav');
    this.$tabulation = this.$cont.querySelector('.js-tabulation');
    this.buttons = Array.from(this.$nav.children);
    this.panels = Array.from(this.$tabulation.children);
    this.count = Math.max(this.buttons.length, this.panels.length);
    this.href = Object(Utils_getHash__WEBPACK_IMPORTED_MODULE_3__["default"])(window.location.href); // Bind method

    this.onResize = this.onResize.bind(this);
    this.onResize();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TabulationEverywhere, [{
    key: "init",
    value: function init() {
      this.initEvents();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      window.addEventListener('resize', this.onResize);

      if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        for (var i = 0; i < this.count; i += 1) {
          if (this.buttons[i].getAttribute('data-name') === hash) {
            this.toggle(this.buttons[i]);
          }
        }
      }

      var _loop = function _loop(_i) {
        _this.buttons[_i].addEventListener('click', function () {
          _this.toggle(_this.buttons[_i]);
        });

        _this.buttons[_i].addEventListener('focus', function () {
          _this.toggle(_this.buttons[_i]);
        });
      };

      for (var _i = 0; _i < this.count; _i += 1) {
        _loop(_i);
      }
    } // Events

  }, {
    key: "onResize",
    value: function onResize() {
      this.$tabulation.style.setProperty('height', "".concat(Object(Utils_getHighestHeight__WEBPACK_IMPORTED_MODULE_2__["default"])(this.panels), "px"));
    }
  }, {
    key: "toggle",
    value: function toggle(element) {
      this.closeAll();
      return this.open(element);
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      for (var i = 0; i < this.count; i += 1) {
        this.buttons[i].setAttribute('aria-selected', false);
        this.buttons[i].classList.remove('is-active');
        this.panels[i].classList.remove('is-active');
      }
    }
    /**
     * @param  obj element
     * @return obj
     */

  }, {
    key: "open",
    value: function open(element) {
      var current = element.getAttribute('data-name');
      element.setAttribute('aria-selected', true);
      this.$tabulation.querySelector("[data-name=".concat(current, "]")).classList.add('is-active');
      return element.classList.add('is-active');
    }
  }]);

  return TabulationEverywhere;
}();



/***/ }),

/***/ "./src/utils/getHash.js":
/*!******************************!*\
  !*** ./src/utils/getHash.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * [description]
 * @param  {[type]} href [description]
 * @return {[type]}      [description]
 * @see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L38
 */
/* harmony default export */ __webpack_exports__["default"] = (function (href) {
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
});

/***/ }),

/***/ "./src/utils/getHighestHeight.js":
/*!***************************************!*\
  !*** ./src/utils/getHighestHeight.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Utils_getOffset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Utils/getOffset */ "./src/utils/getOffset.js");

/* harmony default export */ __webpack_exports__["default"] = (function (elements) {
  return elements.map(function (object) {
    return Object(Utils_getOffset__WEBPACK_IMPORTED_MODULE_0__["default"])(object).height;
  }) // eslint-disable-next-line
  .reduce(function (a, b) {
    return a > b ? a : b;
  });
});

/***/ }),

/***/ "./src/utils/getOffset.js":
/*!********************************!*\
  !*** ./src/utils/getOffset.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Get offset x, y, width and height
 *
 * @param	el		DOM element
 * @return	obj		x and y
 */
/* harmony default export */ __webpack_exports__["default"] = (function (el) {
  return {
    x: el.getBoundingClientRect().left,
    y: el.getBoundingClientRect().top,
    width: el.getBoundingClientRect().width,
    height: el.getBoundingClientRect().height
  };
});

/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map