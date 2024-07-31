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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services__ = __webpack_require__(1);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_bugTracker__ = __webpack_require__(2);
  
  
  var supportedAPI = ['init', 'track']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)
  
  /**
      The main entry of the application
      */
  function app(window) {
    console.log('JS-Widget starting');
  
    // set default configurations
    var configurations = {
      someDefaultConfiguration: false
    };
  
    // all methods that were called till now and stored in queue
    // needs to be called now 
    var globalObject = window[window['JS-Widget']];
    var queue = globalObject.q;
    if (queue) {
      for (var i = 0; i < queue.length; i++) {
        if (queue[i][0].toLowerCase() == 'init') {
          configurations = extendObject(configurations, queue[i][1]);
          Object(__WEBPACK_IMPORTED_MODULE_1__views_bugTracker__["a" /* show */])();
          console.log('JS-Widget started', configurations);
        } else apiHandler(queue[i][0], queue[i][1]);
      }
    }
  
    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = apiHandler;
    globalObject.configurations = configurations;
  }
  
  /**
      Method that handles all API calls
      */
  function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();
    if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
    console.log("Handling API call ".concat(api), params);
    switch (api) {
      // TODO: add API implementation
      case 'track':
        Object(__WEBPACK_IMPORTED_MODULE_1__views_bugTracker__["a" /* show */])(params);
        break;
      default:
        console.warn("No handler defined for ".concat(api));
    }
  }
  function extendObject(a, b) {
    for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
  }
  app(window);
  
  /***/ }),
  /* 1 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* unused harmony export ping */
  function ping() {
    return 'pong';
  }
  
  /***/ }),
  /* 2 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony export (immutable) */ __webpack_exports__["a"] = show;
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bugTracker_html__ = __webpack_require__(3);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bugTracker_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bugTracker_html__);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bugTracker_css__ = __webpack_require__(4);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bugTracker_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__bugTracker_css__);
  
  
  var elements = [];
  var body;
  var fabricCanvas;
  function show(text) {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.0/html2canvas.min.js';
    script.integrity = 'sha512-UcDEnmFoMh0dYHu0wGsf5SKB7z7i5j3GuXHCnb3i4s44hfctoLihr896bxM0zL7jGkcHQXXrJsFIL62ehtd6yQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    var scriptFabric = document.createElement('script');
    scriptFabric.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.5.0/fabric.min.js';
    document.head.appendChild(script);
    document.head.appendChild(scriptFabric);
  
    // convert plain HTML string into DOM elements
    var temporary = document.createElement('div');
    temporary.innerHTML = __WEBPACK_IMPORTED_MODULE_0__bugTracker_html___default.a;
    // temporary.getElementsByClassName('js-widget-dialog')[0].textContent = text;
  
    // append elements to body
    body = document.getElementsByTagName('body')[0];
    while (temporary.children.length > 0) {
      elements.push(temporary.children[0]);
      body.appendChild(temporary.children[0]);
    }
    document.getElementById('bug-report-tab').addEventListener('click', function () {
      var bugReport = document.getElementById('bug-report');
      var bugReportTab = document.getElementById('bug-report-tab');
      if (bugReport.classList.contains('open')) {
        bugReport.classList.remove('open');
        bugReportTab.style.display = 'block';
      } else {
        bugReport.classList.add('open');
        bugReportTab.style.display = 'none';
        bugReport.style.visibility = 'hidden';
        bugReportTab.style.visibility = 'hidden';
        html2canvas(document.body, {
          useCORS: true,
          logging: true
        }).then(function (canvas) {
          var img = document.getElementById('screenshot');
          img.src = canvas.toDataURL();
          bugReport.style.visibility = 'visible';
          bugReportTab.style.visibility = 'visible';
        })["catch"](function (error) {
          return console.error('Error capturing screenshot:', error);
        });
      }
    });
    document.getElementById('edit-screenshot').addEventListener('click', function () {
      var modal = document.getElementById('annotation-modal');
      modal.classList.add('open');
      var img = document.getElementById('screenshot');
      var canvasElement = document.getElementById('annotation-canvas');
      fabricCanvas = new fabric.Canvas('annotation-canvas', {
        backgroundColor: 'white'
      });
      fabric.Image.fromURL(img.src, function (oImg) {
        var editorWidth = document.getElementById('annotation-editor').clientWidth - 40;
        var editorHeight = document.getElementById('annotation-editor').clientHeight - 80;
        var scale = Math.min(editorWidth / oImg.width, editorHeight / oImg.height);
        oImg.scale(scale);
        fabricCanvas.setWidth(oImg.width * scale);
        fabricCanvas.setHeight(oImg.height * scale);
        fabricCanvas.setBackgroundImage(oImg, fabricCanvas.renderAll.bind(fabricCanvas));
      });
    });
    document.getElementById('add-arrow').addEventListener('click', function () {
      var arrow = new fabric.Path('M 0 0 L 0 4 L 2 4 L 2 8 L 8 2 L 2 -4 L 2 0 Z', {
        left: 100,
        top: 100,
        fill: 'red',
        scaleX: 5,
        scaleY: 5,
        originX: 'center',
        originY: 'center'
      });
      fabricCanvas.add(arrow);
    });
    document.getElementById('add-text').addEventListener('click', function () {
      var text = new fabric.Textbox('Enter text here', {
        left: 100,
        top: 200,
        width: 200,
        fontSize: 20,
        borderColor: 'red',
        cornerColor: 'green',
        cornerSize: 6,
        transparentCorners: false,
        editingBorderColor: 'blue'
      });
      fabricCanvas.add(text).setActiveObject(text);
    });
    document.getElementById('delete-item').addEventListener('click', function () {
      var activeObject = fabricCanvas.getActiveObject();
      if (activeObject) {
        fabricCanvas.remove(activeObject);
      }
    });
    document.getElementById('save-annotations').addEventListener('click', function () {
      var modal = document.getElementById('annotation-modal');
      var img = document.getElementById('screenshot');
      img.src = fabricCanvas.toDataURL({
        format: 'png',
        quality: 0.8
      });
      modal.classList.remove('open');
    });
    document.getElementById('send-report').addEventListener('click', function () {
      var screenshot = document.getElementById('screenshot').src;
      var description = document.getElementById('description').value;
      var formData = new FormData();
      formData.append('description', description);
      formData.append('screenshot', screenshot);
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        alert('Bug report sent successfully!');
        var bugReport = document.getElementById('bug-report');
        var bugReportTab = document.getElementById('bug-report-tab');
        bugReport.classList.remove('open');
        bugReportTab.style.display = 'block';
      })["catch"](function (error) {
        return console.error('Error sending bug report:', error);
      });
    });
  }
  
  /***/ }),
  /* 3 */
  /***/ (function(module, exports) {
  
  module.exports = "<div id=\"bug-report-tab\">Report Bug</div>\n<div id=\"bug-report\">\n    <img id=\"logo\" src=\"https://s3.amazonaws.com/appforest_uf/f1623428996372x454024171328204500/MLabsBottleBubblingWhitev2.gif\" alt=\"Logo\" width=\"50\" height=\"50\">\n    <textarea id=\"description\" placeholder=\"Describe the bug\"></textarea>\n    <img id=\"screenshot\" alt=\"Screenshot\">\n    <button id=\"edit-screenshot\">Edit Screenshot</button>\n    <button id=\"send-report\">Send Report</button>\n</div>\n\n<div id=\"annotation-modal\">\n    <div id=\"annotation-editor\">\n        <div id=\"tools\">\n            <img id=\"add-arrow\" class=\"tool-icon\" src=\"https://cdn-icons-png.flaticon.com/512/25/25298.png\" alt=\"Add Arrow\">\n            <img id=\"add-text\" class=\"tool-icon\" src=\"https://cdn-icons-png.flaticon.com/512/1828/1828911.png\" alt=\"Add Text\">\n<button id=\"delete-item\">\n                <img class=\"tool-icon\" src=\"https://cdn-icons-png.flaticon.com/512/565/565922.png\" alt=\"Delete Item\">\n            </button>\n\n            <button id=\"save-annotations\">Save Annotations</button>\n        \n        </div>\n        <canvas id=\"annotation-canvas\"></canvas>\n    </div>\n</div>\n\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.5.0/fabric.min.js\"></script>\n<script>\n   \n</script>";
  
  /***/ }),
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // style-loader: Adds some css to the DOM by adding a <style> tag
  
  // load the styles
  var content = __webpack_require__(5);
  if(typeof content === 'string') content = [[module.i, content, '']];
  // Prepare cssTransformation
  var transform;
  
  var options = {"hmr":true}
  options.transform = transform
  // add the styles to the DOM
  var update = __webpack_require__(7)(content, options);
  if(content.locals) module.exports = content.locals;
  // Hot Module Replacement
  if(false) {
    // When the styles change, update the <style> tags
    if(!content.locals) {
      module.hot.accept("!!../../node_modules/css-loader/dist/cjs.js!./bugTracker.css", function() {
        var newContent = require("!!../../node_modules/css-loader/dist/cjs.js!./bugTracker.css");
        if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
        update(newContent);
      });
    }
    // When the module is disposed, remove the <style> tags
    module.hot.dispose(function() { update(); });
  }
  
  /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {
  
  // Imports
  var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
  exports = ___CSS_LOADER_API_IMPORT___(false);
  // Module
  exports.push([module.i, "#bug-report-tab {\n    position: fixed;\n    right: 0;\n    top: 50%;\n    transform: translateY(-50%);\n    background-color: #FF6737;\n    color: white;\n    padding: 10px;\n    cursor: pointer;\n    z-index: 1000;\n}\n\n#bug-report {\n    position: fixed;\n    right: -345px;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 320px;\n    height: 500px;\n    background: white;\n    border: 1px solid #ccc;\n    padding: 10px;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n    transition: right 0.3s ease-in-out;\n    z-index: 999;\n}\n\n#bug-report.open {\n    right: 0;\n}\n\n#bug-report textarea {\n    width: 100%;\n    height: 100px;\n    margin-bottom: 10px;\n}\n\n#bug-report img {\n    display: block;\n    width: 100%;\n    height: auto;\n    margin-bottom: 10px;\n    border: 2px solid #FF6737;\n}\n\n#send-report, #edit-screenshot {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    width: 100%;\n    margin-bottom: 10px;\n}\n\n#annotation-modal {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(255, 255, 255, 1);\n    justify-content: center;\n    align-items: center;\n    z-index: 10000;\n}\n\n#annotation-modal.open {\n    display: flex;\n}\n\n#annotation-editor {\n    background: white;\n    padding: 20px;\n    position: relative;\n    border: 2px solid #FF6737;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n    width: 80%;\n    height: 80%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#annotation-canvas {\n    border: 2px solid #FF6737;\n    background: white;\n    width: 100%;\n    height: 100%;\n}\n\n#logo {\n    display: block;\n    margin: 0 auto 10px;\n    width: 50px;\n    height: 50px;\n}\n\n.tool-icon {\n    width: 30px;\n    height: 30px;\n    margin: 5px;\n    cursor: pointer;\n}\n\n#tools {\n    display: flex;\n    justify-content: center;\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 1001;\n    padding: 10px 0;\n    border-bottom: 2px solid #FF6737;\n    width: 100%;\n}\n\n#save-annotations {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    margin-left: 10px;\n    margin-right: 10px;\n}\n\n#delete-item {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    margin-left: 10px;\n    margin-right: 10px;\n}", ""]);
  // Exports
  module.exports = exports;
  
  
  /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  // eslint-disable-next-line func-names
  module.exports = function (useSourceMap) {
    var list = []; // return the list of modules as css string
  
    list.toString = function toString() {
      return this.map(function (item) {
        var content = cssWithMappingToString(item, useSourceMap);
  
        if (item[2]) {
          return "@media ".concat(item[2], " {").concat(content, "}");
        }
  
        return content;
      }).join('');
    }; // import a list of modules into the list
    // eslint-disable-next-line func-names
  
  
    list.i = function (modules, mediaQuery, dedupe) {
      if (typeof modules === 'string') {
        // eslint-disable-next-line no-param-reassign
        modules = [[null, modules, '']];
      }
  
      var alreadyImportedModules = {};
  
      if (dedupe) {
        for (var i = 0; i < this.length; i++) {
          // eslint-disable-next-line prefer-destructuring
          var id = this[i][0];
  
          if (id != null) {
            alreadyImportedModules[id] = true;
          }
        }
      }
  
      for (var _i = 0; _i < modules.length; _i++) {
        var item = [].concat(modules[_i]);
  
        if (dedupe && alreadyImportedModules[item[0]]) {
          // eslint-disable-next-line no-continue
          continue;
        }
  
        if (mediaQuery) {
          if (!item[2]) {
            item[2] = mediaQuery;
          } else {
            item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
          }
        }
  
        list.push(item);
      }
    };
  
    return list;
  };
  
  function cssWithMappingToString(item, useSourceMap) {
    var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring
  
    var cssMapping = item[3];
  
    if (!cssMapping) {
      return content;
    }
  
    if (useSourceMap && typeof btoa === 'function') {
      var sourceMapping = toComment(cssMapping);
      var sourceURLs = cssMapping.sources.map(function (source) {
        return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
      });
      return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
    }
  
    return [content].join('\n');
  } // Adapted from convert-source-map (MIT)
  
  
  function toComment(sourceMap) {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    return "/*# ".concat(data, " */");
  }
  
  /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {
  
  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  
  var stylesInDom = {};
  
  var	memoize = function (fn) {
    var memo;
  
    return function () {
      if (typeof memo === "undefined") memo = fn.apply(this, arguments);
      return memo;
    };
  };
  
  var isOldIE = memoize(function () {
    // Test for IE <= 9 as proposed by Browserhacks
    // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
    // Tests for existence of standard globals is to allow style-loader
    // to operate correctly into non-standard environments
    // @see https://github.com/webpack-contrib/style-loader/issues/177
    return window && document && document.all && !window.atob;
  });
  
  var getElement = (function (fn) {
    var memo = {};
  
    return function(selector) {
      if (typeof memo[selector] === "undefined") {
        var styleTarget = fn.call(this, selector);
        // Special case to return head of iframe instead of iframe itself
        if (styleTarget instanceof window.HTMLIFrameElement) {
          try {
            // This will throw an exception if access to iframe is blocked
            // due to cross-origin restrictions
            styleTarget = styleTarget.contentDocument.head;
          } catch(e) {
            styleTarget = null;
          }
        }
        memo[selector] = styleTarget;
      }
      return memo[selector]
    };
  })(function (target) {
    return document.querySelector(target)
  });
  
  var singleton = null;
  var	singletonCounter = 0;
  var	stylesInsertedAtTop = [];
  
  var	fixUrls = __webpack_require__(8);
  
  module.exports = function(list, options) {
    if (typeof DEBUG !== "undefined" && DEBUG) {
      if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
    }
  
    options = options || {};
  
    options.attrs = typeof options.attrs === "object" ? options.attrs : {};
  
    // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
    // tags it will allow on a page
    if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();
  
    // By default, add <style> tags to the <head> element
    if (!options.insertInto) options.insertInto = "head";
  
    // By default, add <style> tags to the bottom of the target
    if (!options.insertAt) options.insertAt = "bottom";
  
    var styles = listToStyles(list, options);
  
    addStylesToDom(styles, options);
  
    return function update (newList) {
      var mayRemove = [];
  
      for (var i = 0; i < styles.length; i++) {
        var item = styles[i];
        var domStyle = stylesInDom[item.id];
  
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
  
      if(newList) {
        var newStyles = listToStyles(newList, options);
        addStylesToDom(newStyles, options);
      }
  
      for (var i = 0; i < mayRemove.length; i++) {
        var domStyle = mayRemove[i];
  
        if(domStyle.refs === 0) {
          for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
  
          delete stylesInDom[domStyle.id];
        }
      }
    };
  };
  
  function addStylesToDom (styles, options) {
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];
  
      if(domStyle) {
        domStyle.refs++;
  
        for(var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j](item.parts[j]);
        }
  
        for(; j < item.parts.length; j++) {
          domStyle.parts.push(addStyle(item.parts[j], options));
        }
      } else {
        var parts = [];
  
        for(var j = 0; j < item.parts.length; j++) {
          parts.push(addStyle(item.parts[j], options));
        }
  
        stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
      }
    }
  }
  
  function listToStyles (list, options) {
    var styles = [];
    var newStyles = {};
  
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var id = options.base ? item[0] + options.base : item[0];
      var css = item[1];
      var media = item[2];
      var sourceMap = item[3];
      var part = {css: css, media: media, sourceMap: sourceMap};
  
      if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
      else newStyles[id].parts.push(part);
    }
  
    return styles;
  }
  
  function insertStyleElement (options, style) {
    var target = getElement(options.insertInto)
  
    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
    }
  
    var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
  
    if (options.insertAt === "top") {
      if (!lastStyleElementInsertedAtTop) {
        target.insertBefore(style, target.firstChild);
      } else if (lastStyleElementInsertedAtTop.nextSibling) {
        target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
      } else {
        target.appendChild(style);
      }
      stylesInsertedAtTop.push(style);
    } else if (options.insertAt === "bottom") {
      target.appendChild(style);
    } else if (typeof options.insertAt === "object" && options.insertAt.before) {
      var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
      target.insertBefore(style, nextSibling);
    } else {
      throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
    }
  }
  
  function removeStyleElement (style) {
    if (style.parentNode === null) return false;
    style.parentNode.removeChild(style);
  
    var idx = stylesInsertedAtTop.indexOf(style);
    if(idx >= 0) {
      stylesInsertedAtTop.splice(idx, 1);
    }
  }
  
  function createStyleElement (options) {
    var style = document.createElement("style");
  
    options.attrs.type = "text/css";
  
    addAttrs(style, options.attrs);
    insertStyleElement(options, style);
  
    return style;
  }
  
  function createLinkElement (options) {
    var link = document.createElement("link");
  
    options.attrs.type = "text/css";
    options.attrs.rel = "stylesheet";
  
    addAttrs(link, options.attrs);
    insertStyleElement(options, link);
  
    return link;
  }
  
  function addAttrs (el, attrs) {
    Object.keys(attrs).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });
  }
  
  function addStyle (obj, options) {
    var style, update, remove, result;
  
    // If a transform function was defined, run it on the css
    if (options.transform && obj.css) {
        result = options.transform(obj.css);
  
        if (result) {
          // If transform returns a value, use that instead of the original css.
          // This allows running runtime transformations on the css.
          obj.css = result;
        } else {
          // If the transform function returns a falsy value, don't add this css.
          // This allows conditional loading of css
          return function() {
            // noop
          };
        }
    }
  
    if (options.singleton) {
      var styleIndex = singletonCounter++;
  
      style = singleton || (singleton = createStyleElement(options));
  
      update = applyToSingletonTag.bind(null, style, styleIndex, false);
      remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  
    } else if (
      obj.sourceMap &&
      typeof URL === "function" &&
      typeof URL.createObjectURL === "function" &&
      typeof URL.revokeObjectURL === "function" &&
      typeof Blob === "function" &&
      typeof btoa === "function"
    ) {
      style = createLinkElement(options);
      update = updateLink.bind(null, style, options);
      remove = function () {
        removeStyleElement(style);
  
        if(style.href) URL.revokeObjectURL(style.href);
      };
    } else {
      style = createStyleElement(options);
      update = applyToTag.bind(null, style);
      remove = function () {
        removeStyleElement(style);
      };
    }
  
    update(obj);
  
    return function updateStyle (newObj) {
      if (newObj) {
        if (
          newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap
        ) {
          return;
        }
  
        update(obj = newObj);
      } else {
        remove();
      }
    };
  }
  
  var replaceText = (function () {
    var textStore = [];
  
    return function (index, replacement) {
      textStore[index] = replacement;
  
      return textStore.filter(Boolean).join('\n');
    };
  })();
  
  function applyToSingletonTag (style, index, remove, obj) {
    var css = remove ? "" : obj.css;
  
    if (style.styleSheet) {
      style.styleSheet.cssText = replaceText(index, css);
    } else {
      var cssNode = document.createTextNode(css);
      var childNodes = style.childNodes;
  
      if (childNodes[index]) style.removeChild(childNodes[index]);
  
      if (childNodes.length) {
        style.insertBefore(cssNode, childNodes[index]);
      } else {
        style.appendChild(cssNode);
      }
    }
  }
  
  function applyToTag (style, obj) {
    var css = obj.css;
    var media = obj.media;
  
    if(media) {
      style.setAttribute("media", media)
    }
  
    if(style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      while(style.firstChild) {
        style.removeChild(style.firstChild);
      }
  
      style.appendChild(document.createTextNode(css));
    }
  }
  
  function updateLink (link, options, obj) {
    var css = obj.css;
    var sourceMap = obj.sourceMap;
  
    /*
      If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
      and there is no publicPath defined then lets turn convertToAbsoluteUrls
      on by default.  Otherwise default to the convertToAbsoluteUrls option
      directly
    */
    var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
  
    if (options.convertToAbsoluteUrls || autoFixUrls) {
      css = fixUrls(css);
    }
  
    if (sourceMap) {
      // http://stackoverflow.com/a/26603875
      css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
    }
  
    var blob = new Blob([css], { type: "text/css" });
  
    var oldSrc = link.href;
  
    link.href = URL.createObjectURL(blob);
  
    if(oldSrc) URL.revokeObjectURL(oldSrc);
  }
  
  
  /***/ }),
  /* 8 */
  /***/ (function(module, exports) {
  
  
  /**
   * When source maps are enabled, `style-loader` uses a link element with a data-uri to
   * embed the css on the page. This breaks all relative urls because now they are relative to a
   * bundle instead of the current page.
   *
   * One solution is to only use full urls, but that may be impossible.
   *
   * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
   *
   * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
   *
   */
  
  module.exports = function (css) {
    // get current location
    var location = typeof window !== "undefined" && window.location;
  
    if (!location) {
      throw new Error("fixUrls requires window.location");
    }
  
    // blank or null?
    if (!css || typeof css !== "string") {
      return css;
    }
  
    var baseUrl = location.protocol + "//" + location.host;
    var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
  
    // convert each url(...)
    /*
    This regular expression is just a way to recursively match brackets within
    a string.
  
     /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
       (  = Start a capturing group
         (?:  = Start a non-capturing group
             [^)(]  = Match anything that isn't a parentheses
             |  = OR
             \(  = Match a start parentheses
                 (?:  = Start another non-capturing groups
                     [^)(]+  = Match anything that isn't a parentheses
                     |  = OR
                     \(  = Match a start parentheses
                         [^)(]*  = Match anything that isn't a parentheses
                     \)  = Match a end parentheses
                 )  = End Group
                *\) = Match anything and then a close parens
            )  = Close non-capturing group
            *  = Match anything
         )  = Close capturing group
     \)  = Match a close parens
  
     /gi  = Get all matches, not the first.  Be case insensitive.
     */
    var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
      // strip quotes (if they exist)
      var unquotedOrigUrl = origUrl
        .trim()
        .replace(/^"(.*)"$/, function(o, $1){ return $1; })
        .replace(/^'(.*)'$/, function(o, $1){ return $1; });
  
      // already a full url? no change
      if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
        return fullMatch;
      }
  
      // convert the url to a full url
      var newUrl;
  
      if (unquotedOrigUrl.indexOf("//") === 0) {
          //TODO: should we add protocol?
        newUrl = unquotedOrigUrl;
      } else if (unquotedOrigUrl.indexOf("/") === 0) {
        // path should be relative to the base url
        newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
      } else {
        // path should be relative to current directory
        newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
      }
  
      // send back the fixed url(...)
      return "url(" + JSON.stringify(newUrl) + ")";
    });
  
    // send back the fixed css
    return fixedCss;
  };
  
  
  /***/ })
  /******/ ]);
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDZiYTFjODFkNWM5MzRjYmE4MmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzP2IyODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0Iiwic2hvdyIsImFwaUhhbmRsZXIiLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjb25jYXQiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInBpbmciLCJlbGVtZW50cyIsImJvZHkiLCJmYWJyaWNDYW52YXMiLCJ0ZXh0Iiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiaW50ZWdyaXR5IiwiY3Jvc3NPcmlnaW4iLCJyZWZlcnJlclBvbGljeSIsInNjcmlwdEZhYnJpYyIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInRlbXBvcmFyeSIsImlubmVySFRNTCIsImh0bWwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoaWxkcmVuIiwicHVzaCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1Z1JlcG9ydCIsImJ1Z1JlcG9ydFRhYiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkIiwidmlzaWJpbGl0eSIsImh0bWwyY2FudmFzIiwidXNlQ09SUyIsImxvZ2dpbmciLCJ0aGVuIiwiY2FudmFzIiwiaW1nIiwidG9EYXRhVVJMIiwiZXJyb3IiLCJtb2RhbCIsImNhbnZhc0VsZW1lbnQiLCJmYWJyaWMiLCJDYW52YXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJJbWFnZSIsImZyb21VUkwiLCJvSW1nIiwiZWRpdG9yV2lkdGgiLCJjbGllbnRXaWR0aCIsImVkaXRvckhlaWdodCIsImNsaWVudEhlaWdodCIsInNjYWxlIiwiTWF0aCIsIm1pbiIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0V2lkdGgiLCJzZXRIZWlnaHQiLCJzZXRCYWNrZ3JvdW5kSW1hZ2UiLCJyZW5kZXJBbGwiLCJiaW5kIiwiYXJyb3ciLCJQYXRoIiwibGVmdCIsInRvcCIsImZpbGwiLCJzY2FsZVgiLCJzY2FsZVkiLCJvcmlnaW5YIiwib3JpZ2luWSIsIlRleHRib3giLCJmb250U2l6ZSIsImJvcmRlckNvbG9yIiwiY29ybmVyQ29sb3IiLCJjb3JuZXJTaXplIiwidHJhbnNwYXJlbnRDb3JuZXJzIiwiZWRpdGluZ0JvcmRlckNvbG9yIiwic2V0QWN0aXZlT2JqZWN0IiwiYWN0aXZlT2JqZWN0IiwiZ2V0QWN0aXZlT2JqZWN0IiwiZm9ybWF0IiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJkZXNjcmlwdGlvbiIsInZhbHVlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJhbGVy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LEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDs7QUFFQSw2QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzVXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EiLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDZiYTFjODFkNWM5MzRjYmE4MmEiLCJpbXBvcnQgeyBwaW5nIH0gZnJvbSAnLi9zZXJ2aWNlcydcbmltcG9ydCB7IHNob3cgfSBmcm9tICcuL3ZpZXdzL2J1Z1RyYWNrZXInXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICd0cmFjaycgXTsgLy8gZW5saXN0IGFsbCBtZXRob2RzIHN1cHBvcnRlZCBieSBBUEkgKGUuZy4gYG13KCdldmVudCcsICd1c2VyLWxvZ2luJyk7YClcblxuLyoqXG4gICAgVGhlIG1haW4gZW50cnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0aW5nJyk7XG5cbiAgICAvLyBzZXQgZGVmYXVsdCBjb25maWd1cmF0aW9uc1xuICAgIGxldCBjb25maWd1cmF0aW9ucyA9IHtcbiAgICAgICAgc29tZURlZmF1bHRDb25maWd1cmF0aW9uOiBmYWxzZVxuICAgIH07XG5cbiAgICAvLyBhbGwgbWV0aG9kcyB0aGF0IHdlcmUgY2FsbGVkIHRpbGwgbm93IGFuZCBzdG9yZWQgaW4gcXVldWVcbiAgICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93IFxuICAgIGxldCBnbG9iYWxPYmplY3QgPSB3aW5kb3dbd2luZG93WydKUy1XaWRnZXQnXV07XG4gICAgbGV0IHF1ZXVlID0gZ2xvYmFsT2JqZWN0LnE7XG4gICAgaWYgKHF1ZXVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChxdWV1ZVtpXVswXS50b0xvd2VyQ2FzZSgpID09ICdpbml0Jykge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25zID0gZXh0ZW5kT2JqZWN0KGNvbmZpZ3VyYXRpb25zLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRlZCcsIGNvbmZpZ3VyYXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhcGlIYW5kbGVyKHF1ZXVlW2ldWzBdLCBxdWV1ZVtpXVsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBvdmVycmlkZSB0ZW1wb3JhcnkgKHVudGlsIHRoZSBhcHAgbG9hZGVkKSBoYW5kbGVyXG4gICAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICAgIGdsb2JhbE9iamVjdCA9IGFwaUhhbmRsZXI7XG4gICAgZ2xvYmFsT2JqZWN0LmNvbmZpZ3VyYXRpb25zID0gY29uZmlndXJhdGlvbnM7XG5cbiAgICBcbn1cblxuLyoqXG4gICAgTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gICAgKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMpIHtcbiAgICBpZiAoIWFwaSkgdGhyb3cgRXJyb3IoJ0FQSSBtZXRob2QgcmVxdWlyZWQnKTtcbiAgICBhcGkgPSBhcGkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gICAgY29uc29sZS5sb2coYEhhbmRsaW5nIEFQSSBjYWxsICR7YXBpfWAsIHBhcmFtcyk7XG5cbiAgICBzd2l0Y2ggKGFwaSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgQVBJIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNhc2UgJ3RyYWNrJzpcbiAgICAgICAgICAgIHNob3cocGFyYW1zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBoYW5kbGVyIGRlZmluZWQgZm9yICR7YXBpfWApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGEsIGIpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICAgICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJcbmV4cG9ydCBmdW5jdGlvbiBwaW5nKCkge1xuICAgIHJldHVybiAncG9uZyc7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZpY2VzLmpzIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9idWdUcmFja2VyLmh0bWwnO1xuaW1wb3J0ICcuL2J1Z1RyYWNrZXIuY3NzJztcblxubGV0IGVsZW1lbnRzID0gW107XG5sZXQgYm9keTtcbmxldCBmYWJyaWNDYW52YXM7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3codGV4dCkge1xuICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2h0bWwyY2FudmFzLzEuNC4wL2h0bWwyY2FudmFzLm1pbi5qcyc7XG4gICAgc2NyaXB0LmludGVncml0eSA9ICdzaGE1MTItVWNERW5tRm9NaDBkWUh1MHdHc2Y1U0tCN3o3aTVqM0d1WEhDbmIzaTRzNDRoZmN0b0xpaHI4OTZieE0wekw3akdrY0hRWFhySnNGSUw2MmVodGQ2eVE9PSc7XG4gICAgc2NyaXB0LmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgc2NyaXB0LnJlZmVycmVyUG9saWN5ID0gJ25vLXJlZmVycmVyJztcbiAgICBcbiAgICBsZXQgc2NyaXB0RmFicmljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0RmFicmljLnNyYyA9ICdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mYWJyaWMuanMvNC41LjAvZmFicmljLm1pbi5qcyc7XG4gICAgXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0RmFicmljKTtcblxuXG4gICAgLy8gY29udmVydCBwbGFpbiBIVE1MIHN0cmluZyBpbnRvIERPTSBlbGVtZW50c1xuICAgIGxldCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wb3JhcnkuaW5uZXJIVE1MID0gaHRtbDtcbiAgIC8vIHRlbXBvcmFyeS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy13aWRnZXQtZGlhbG9nJylbMF0udGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgLy8gYXBwZW5kIGVsZW1lbnRzIHRvIGJvZHlcbiAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWxlbWVudHMucHVzaCh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gICAgfVxuXG4gICAgXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0LXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYnVnUmVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1Zy1yZXBvcnQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBidWdSZXBvcnRUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVnLXJlcG9ydC10YWInKTtcblxuICAgICAgICAgICAgICAgIGlmIChidWdSZXBvcnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0VGFiLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydFRhYi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnRUYWIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwyY2FudmFzKGRvY3VtZW50LmJvZHksIHsgdXNlQ09SUzogdHJ1ZSwgbG9nZ2luZzogdHJ1ZSB9KS50aGVuKGNhbnZhcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuc2hvdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnRUYWIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgY2FwdHVyaW5nIHNjcmVlbnNob3Q6JywgZXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtc2NyZWVuc2hvdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5ub3RhdGlvbi1tb2RhbCcpO1xuICAgICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW5zaG90Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdGF0aW9uLWNhbnZhcycpO1xuICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcyA9IG5ldyBmYWJyaWMuQ2FudmFzKCdhbm5vdGF0aW9uLWNhbnZhcycsIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmYWJyaWMuSW1hZ2UuZnJvbVVSTChpbWcuc3JjLCBmdW5jdGlvbihvSW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRvcldpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tZWRpdG9yJykuY2xpZW50V2lkdGggLSA0MDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdG9ySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tZWRpdG9yJykuY2xpZW50SGVpZ2h0IC0gODA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5taW4oZWRpdG9yV2lkdGggLyBvSW1nLndpZHRoLCBlZGl0b3JIZWlnaHQgLyBvSW1nLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIG9JbWcuc2NhbGUoc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuc2V0V2lkdGgob0ltZy53aWR0aCAqIHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLnNldEhlaWdodChvSW1nLmhlaWdodCAqIHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLnNldEJhY2tncm91bmRJbWFnZShvSW1nLCBmYWJyaWNDYW52YXMucmVuZGVyQWxsLmJpbmQoZmFicmljQ2FudmFzKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1hcnJvdycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBuZXcgZmFicmljLlBhdGgoJ00gMCAwIEwgMCA0IEwgMiA0IEwgMiA4IEwgOCAyIEwgMiAtNCBMIDIgMCBaJywge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMTAwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsOiAncmVkJyxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVYOiA1LFxuICAgICAgICAgICAgICAgICAgICBzY2FsZVk6IDUsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5hZGQoYXJyb3cpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IG5ldyBmYWJyaWMuVGV4dGJveCgnRW50ZXIgdGV4dCBoZXJlJywge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMjAwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAncmVkJyxcbiAgICAgICAgICAgICAgICAgICAgY29ybmVyQ29sb3I6ICdncmVlbicsXG4gICAgICAgICAgICAgICAgICAgIGNvcm5lclNpemU6IDYsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50Q29ybmVyczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRpbmdCb3JkZXJDb2xvcjogJ2JsdWUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLmFkZCh0ZXh0KS5zZXRBY3RpdmVPYmplY3QodGV4dCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS1pdGVtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVPYmplY3QgPSBmYWJyaWNDYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZU9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMucmVtb3ZlKGFjdGl2ZU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLWFubm90YXRpb25zJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdGF0aW9uLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbnNob3QnKTtcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gZmFicmljQ2FudmFzLnRvRGF0YVVSTCh7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ3BuZycsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IDAuOFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VuZC1yZXBvcnQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmVlbnNob3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuc2hvdCcpLnNyYztcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2Rlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2NyZWVuc2hvdCcsIHNjcmVlbnNob3QpO1xuXG4gICAgICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vZm9ybXNwcmVlLmlvL2YvWU9VUl9GT1JNX0lEJywge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBmb3JtRGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnQnVnIHJlcG9ydCBzZW50IHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVnUmVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1Zy1yZXBvcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVnUmVwb3J0VGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1Zy1yZXBvcnQtdGFiJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydFRhYi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBzZW5kaW5nIGJ1ZyByZXBvcnQ6JywgZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwiYnVnLXJlcG9ydC10YWJcXFwiPlJlcG9ydCBCdWc8L2Rpdj5cXG48ZGl2IGlkPVxcXCJidWctcmVwb3J0XFxcIj5cXG4gICAgPGltZyBpZD1cXFwibG9nb1xcXCIgc3JjPVxcXCJodHRwczovL3MzLmFtYXpvbmF3cy5jb20vYXBwZm9yZXN0X3VmL2YxNjIzNDI4OTk2MzcyeDQ1NDAyNDE3MTMyODIwNDUwMC9NTGFic0JvdHRsZUJ1YmJsaW5nV2hpdGV2Mi5naWZcXFwiIGFsdD1cXFwiTG9nb1xcXCIgd2lkdGg9XFxcIjUwXFxcIiBoZWlnaHQ9XFxcIjUwXFxcIj5cXG4gICAgPHRleHRhcmVhIGlkPVxcXCJkZXNjcmlwdGlvblxcXCIgcGxhY2Vob2xkZXI9XFxcIkRlc2NyaWJlIHRoZSBidWdcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbWcgaWQ9XFxcInNjcmVlbnNob3RcXFwiIGFsdD1cXFwiU2NyZWVuc2hvdFxcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcImVkaXQtc2NyZWVuc2hvdFxcXCI+RWRpdCBTY3JlZW5zaG90PC9idXR0b24+XFxuICAgIDxidXR0b24gaWQ9XFxcInNlbmQtcmVwb3J0XFxcIj5TZW5kIFJlcG9ydDwvYnV0dG9uPlxcbjwvZGl2PlxcblxcbjxkaXYgaWQ9XFxcImFubm90YXRpb24tbW9kYWxcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJhbm5vdGF0aW9uLWVkaXRvclxcXCI+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ0b29sc1xcXCI+XFxuICAgICAgICAgICAgPGltZyBpZD1cXFwiYWRkLWFycm93XFxcIiBjbGFzcz1cXFwidG9vbC1pY29uXFxcIiBzcmM9XFxcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzI1LzI1Mjk4LnBuZ1xcXCIgYWx0PVxcXCJBZGQgQXJyb3dcXFwiPlxcbiAgICAgICAgICAgIDxpbWcgaWQ9XFxcImFkZC10ZXh0XFxcIiBjbGFzcz1cXFwidG9vbC1pY29uXFxcIiBzcmM9XFxcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzE4MjgvMTgyODkxMS5wbmdcXFwiIGFsdD1cXFwiQWRkIFRleHRcXFwiPlxcbjxidXR0b24gaWQ9XFxcImRlbGV0ZS1pdGVtXFxcIj5cXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwidG9vbC1pY29uXFxcIiBzcmM9XFxcImh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vNTEyLzU2NS81NjU5MjIucG5nXFxcIiBhbHQ9XFxcIkRlbGV0ZSBJdGVtXFxcIj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJzYXZlLWFubm90YXRpb25zXFxcIj5TYXZlIEFubm90YXRpb25zPC9idXR0b24+XFxuICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGNhbnZhcyBpZD1cXFwiYW5ub3RhdGlvbi1jYW52YXNcXFwiPjwvY2FudmFzPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cXG5cXG48c2NyaXB0IHNyYz1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvaHRtbDJjYW52YXMvMS40LjEvaHRtbDJjYW52YXMubWluLmpzXFxcIj48L3NjcmlwdD5cXG48c2NyaXB0IHNyYz1cXFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZmFicmljLmpzLzQuNS4wL2ZhYnJpYy5taW4uanNcXFwiPjwvc2NyaXB0PlxcbjxzY3JpcHQ+XFxuICAgXFxuPC9zY3JpcHQ+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvYnVnVHJhY2tlci5odG1sXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2J1Z1RyYWNrZXIuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2J1Z1RyYWNrZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2J1Z1RyYWNrZXIuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy92aWV3cy9idWdUcmFja2VyLmNzc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1Zy1yZXBvcnQtdGFiIHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNjczNztcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHotaW5kZXg6IDEwMDA7XFxufVxcblxcbiNidWctcmVwb3J0IHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICByaWdodDogLTM0NXB4O1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICB3aWR0aDogMzIwcHg7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsMCwwLDAuMSk7XFxuICAgIHRyYW5zaXRpb246IHJpZ2h0IDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIHotaW5kZXg6IDk5OTtcXG59XFxuXFxuI2J1Zy1yZXBvcnQub3BlbiB7XFxuICAgIHJpZ2h0OiAwO1xcbn1cXG5cXG4jYnVnLXJlcG9ydCB0ZXh0YXJlYSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4jYnVnLXJlcG9ydCBpbWcge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgYm9yZGVyOiAycHggc29saWQgI0ZGNjczNztcXG59XFxuXFxuI3NlbmQtcmVwb3J0LCAjZWRpdC1zY3JlZW5zaG90IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNjczNztcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbiNhbm5vdGF0aW9uLW1vZGFsIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB6LWluZGV4OiAxMDAwMDtcXG59XFxuXFxuI2Fubm90YXRpb24tbW9kYWwub3BlbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbiNhbm5vdGF0aW9uLWVkaXRvciB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNGRjY3Mzc7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwwLDAsMC4xKTtcXG4gICAgd2lkdGg6IDgwJTtcXG4gICAgaGVpZ2h0OiA4MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNhbm5vdGF0aW9uLWNhbnZhcyB7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNGRjY3Mzc7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jbG9nbyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW46IDAgYXV0byAxMHB4O1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4udG9vbC1pY29uIHtcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDtcXG4gICAgbWFyZ2luOiA1cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI3Rvb2xzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiBzdGlja3k7XFxuICAgIHRvcDogMDtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIHotaW5kZXg6IDEwMDE7XFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNGRjY3Mzc7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4jc2F2ZS1hbm5vdGF0aW9ucyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbiNkZWxldGUtaXRlbSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVwiLCBcIlwiXSk7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9