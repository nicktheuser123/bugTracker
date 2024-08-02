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
          Object(__WEBPACK_IMPORTED_MODULE_1__views_bugTracker__["a" /* show */])(configurations.projectId, configurations.version);
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
  function show(projectId, version) {
    var currentProjectId = projectId;
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
      var pageUrl = window.location.href;
      var formData = new FormData();
      formData.append('description', description);
      formData.append('screenshot', screenshot);
      formData.append('projectId', currentProjectId);
      formData.append('pageUrl', pageUrl);
      fetch("https://app.millionlabs.co.uk/version-".concat(version, "/api/1.1/wf/bugreport"), {
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
  exports.push([module.i, "#bug-report-tab {\n    position: fixed;\n    right: 0;\n    top: 50%;\n    transform: translateY(-50%);\n    background-color: #FF6737;\n    color: white;\n    padding: 10px;\n    cursor: pointer;\n    z-index: 1000;\n}\n\n#bug-report {\n    position: fixed;\n    right: -345px;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 320px;\n    height: 500px;\n    background: white;\n    border: 1px solid #ccc;\n    padding: 10px;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n    transition: right 0.3s ease-in-out;\n    z-index: 999;\n}\n\n#bug-report.open {\n    right: 0;\n}\n\n#bug-report textarea {\n    width: 100%;\n    height: 100px;\n    margin-bottom: 10px;\n}\n\n#bug-report img {\n    display: block;\n    width: 100%;\n    height: auto;\n    margin-bottom: 10px;\n    border: 2px solid #FF6737;\n}\n\n#send-report, #edit-screenshot {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    width: 100%;\n    margin-bottom: 10px;\n}\n\n#annotation-modal {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(255, 255, 255, 1);\n    justify-content: center;\n    align-items: center;\n    z-index: 10000;\n}\n\n#annotation-modal.open {\n    display: flex;\n}\n\n#annotation-editor {\n    background: white;\n    padding: 20px;\n    position: relative;\n    border: 2px solid #FF6737;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n    width: 80%;\n    height: 80%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#annotation-canvas {\n    border: 2px solid #FF6737;\n    background: white;\n    width: 100%;\n    height: 100%;\n}\n\n#logo {\n    display: block;\n    margin: 0 auto 10px;\n    width: 50px !important;\n    height: 50px !important;\n}\n\n.tool-icon {\n    width: 30px;\n    height: 30px;\n    margin: 5px;\n    cursor: pointer;\n}\n\n#tools {\n    display: flex;\n    justify-content: center;\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 1001;\n    padding: 10px 0;\n    border-bottom: 2px solid #FF6737;\n    width: 100%;\n}\n\n#save-annotations {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    margin-left: 10px;\n    margin-right: 10px;\n}\n\n#delete-item {\n    background-color: #FF6737;\n    color: white;\n    border: none;\n    padding: 10px;\n    cursor: pointer;\n    margin-left: 10px;\n    margin-right: 10px;\n}", ""]);
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
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGJmMzAxMTNiZTY4MGFjZjU0MDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzP2IyODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0Iiwic2hvdyIsInByb2plY3RJZCIsInZlcnNpb24iLCJhcGlIYW5kbGVyIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwiY29uY2F0Iiwid2FybiIsImEiLCJiIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJwaW5nIiwiZWxlbWVudHMiLCJib2R5IiwiZmFicmljQ2FudmFzIiwiY3VycmVudFByb2plY3RJZCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImludGVncml0eSIsImNyb3NzT3JpZ2luIiwicmVmZXJyZXJQb2xpY3kiLCJzY3JpcHRGYWJyaWMiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJ0ZW1wb3JhcnkiLCJpbm5lckhUTUwiLCJodG1sIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjaGlsZHJlbiIsInB1c2giLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidWdSZXBvcnQiLCJidWdSZXBvcnRUYWIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsInN0eWxlIiwiZGlzcGxheSIsImFkZCIsInZpc2liaWxpdHkiLCJodG1sMmNhbnZhcyIsInVzZUNPUlMiLCJsb2dnaW5nIiwidGhlbiIsImNhbnZhcyIsImltZyIsInRvRGF0YVVSTCIsImVycm9yIiwibW9kYWwiLCJjYW52YXNFbGVtZW50IiwiZmFicmljIiwiQ2FudmFzIiwiYmFja2dyb3VuZENvbG9yIiwiSW1hZ2UiLCJmcm9tVVJMIiwib0ltZyIsImVkaXRvcldpZHRoIiwiY2xpZW50V2lkdGgiLCJlZGl0b3JIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzY2FsZSIsIk1hdGgiLCJtaW4iLCJ3aWR0aCIsImhlaWdodCIsInNldFdpZHRoIiwic2V0SGVpZ2h0Iiwic2V0QmFja2dyb3VuZEltYWdlIiwicmVuZGVyQWxsIiwiYmluZCIsImFycm93IiwiUGF0aCIsImxlZnQiLCJ0b3AiLCJmaWxsIiwic2NhbGVYIiwic2NhbGVZIiwib3JpZ2luWCIsIm9yaWdpblkiLCJ0ZXh0IiwiVGV4dGJveCIsImZvbnRTaXplIiwiYm9yZGVyQ29sb3IiLCJjb3JuZXJDb2xvciIsImNvcm5lclNpemUiLCJ0cmFuc3BhcmVudENvcm5lcnMiLCJlZGl0aW5nQm9yZGVyQ29sb3IiLCJzZXRBY3RpdmVPYmplY3QiLCJhY3RpdmVPYmplY3QiLCJnZXRBY3RpdmVPYmplY3QiLCJmb3JtYXQiLCJxdWFsaXR5Iiwic2NyZWVuc2hvdCIsImRlc2NyaXB0aW9uIiwidmFsdWUiLCJwYWdlVXJsIiwibG9jYXRpb24iLCJocmVmIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJhbGVydCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBaUM7QUFDUTtBQUV6QyxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQzs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsR0FBR0EsQ0FBQ0MsTUFBTSxFQUFFO0VBQ2pCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzs7RUFFakM7RUFDQSxJQUFJQyxjQUFjLEdBQUc7SUFDakJDLHdCQUF3QixFQUFFO0VBQzlCLENBQUM7O0VBRUQ7RUFDQTtFQUNBLElBQUlDLFlBQVksR0FBR0wsTUFBTSxDQUFDQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDOUMsSUFBSU0sS0FBSyxHQUFHRCxZQUFZLENBQUNFLENBQUM7RUFDMUIsSUFBSUQsS0FBSyxFQUFFO0lBQ1AsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUNuQyxJQUFJRixLQUFLLENBQUNFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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c0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YmYzMDExM2JlNjgwYWNmNTQwMSIsImltcG9ydCB7IHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzJ1xuaW1wb3J0IHsgc2hvdyB9IGZyb20gJy4vdmlld3MvYnVnVHJhY2tlcidcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3RyYWNrJyBdOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuXG4vKipcbiAgICBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAqL1xuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRpbmcnKTtcblxuICAgIC8vIHNldCBkZWZhdWx0IGNvbmZpZ3VyYXRpb25zXG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBzb21lRGVmYXVsdENvbmZpZ3VyYXRpb246IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3cgXG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0pTLVdpZGdldCddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBzaG93KGNvbmZpZ3VyYXRpb25zLnByb2plY3RJZCxjb25maWd1cmF0aW9ucy52ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSlMtV2lkZ2V0IHN0YXJ0ZWQnLCBjb25maWd1cmF0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYXBpSGFuZGxlcihxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gb3ZlcnJpZGUgdGVtcG9yYXJ5ICh1bnRpbCB0aGUgYXBwIGxvYWRlZCkgaGFuZGxlclxuICAgIC8vIGZvciB3aWRnZXQncyBBUEkgY2FsbHNcbiAgICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICAgIGdsb2JhbE9iamVjdC5jb25maWd1cmF0aW9ucyA9IGNvbmZpZ3VyYXRpb25zO1xuXG4gICAgXG59XG5cbi8qKlxuICAgIE1ldGhvZCB0aGF0IGhhbmRsZXMgYWxsIEFQSSBjYWxsc1xuICAgICovXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGFwaSwgcGFyYW1zKSB7XG4gICAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gICAgYXBpID0gYXBpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoc3VwcG9ydGVkQVBJLmluZGV4T2YoYXBpKSA9PT0gLTEpIHRocm93IEVycm9yKGBNZXRob2QgJHthcGl9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcblxuICAgIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuXG4gICAgc3dpdGNoIChhcGkpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgICAgICBjYXNlICd0cmFjayc6XG4gICAgICAgICAgICBzaG93KHBhcmFtcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9iamVjdChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpXG4gICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59XG5cbmFwcCh3aW5kb3cpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLmpzIiwiXG5leHBvcnQgZnVuY3Rpb24gcGluZygpIHtcbiAgICByZXR1cm4gJ3BvbmcnO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2aWNlcy5qcyIsImltcG9ydCBodG1sIGZyb20gJy4vYnVnVHJhY2tlci5odG1sJztcbmltcG9ydCAnLi9idWdUcmFja2VyLmNzcyc7XG5cbmxldCBlbGVtZW50cyA9IFtdO1xubGV0IGJvZHk7XG5sZXQgZmFicmljQ2FudmFzO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93KHByb2plY3RJZCx2ZXJzaW9uKSB7XG4gICAgXG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XG5cbiAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9ICdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9odG1sMmNhbnZhcy8xLjQuMC9odG1sMmNhbnZhcy5taW4uanMnO1xuICAgIHNjcmlwdC5pbnRlZ3JpdHkgPSAnc2hhNTEyLVVjREVubUZvTWgwZFlIdTB3R3NmNVNLQjd6N2k1ajNHdVhIQ25iM2k0czQ0aGZjdG9MaWhyODk2YnhNMHpMN2pHa2NIUVhYckpzRklMNjJlaHRkNnlRPT0nO1xuICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgIHNjcmlwdC5yZWZlcnJlclBvbGljeSA9ICduby1yZWZlcnJlcic7XG4gICAgXG4gICAgbGV0IHNjcmlwdEZhYnJpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdEZhYnJpYy5zcmMgPSAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZmFicmljLmpzLzQuNS4wL2ZhYnJpYy5taW4uanMnO1xuICAgIFxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEZhYnJpYyk7XG4gICAgXG5cbiAgICAvLyBjb252ZXJ0IHBsYWluIEhUTUwgc3RyaW5nIGludG8gRE9NIGVsZW1lbnRzXG4gICAgbGV0IHRlbXBvcmFyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRlbXBvcmFyeS5pbm5lckhUTUwgPSBodG1sO1xuICAgLy8gdGVtcG9yYXJ5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXdpZGdldC1kaWFsb2cnKVswXS50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICAvLyBhcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICAgIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIHdoaWxlICh0ZW1wb3JhcnkuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBlbGVtZW50cy5wdXNoKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGVtcG9yYXJ5LmNoaWxkcmVuWzBdKTtcbiAgICB9XG5cbiAgICBcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1Zy1yZXBvcnQtdGFiJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBidWdSZXBvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVnLXJlcG9ydCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1Z1JlcG9ydFRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0LXRhYicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJ1Z1JlcG9ydC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnQuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnRUYWIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0VGFiLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydFRhYi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbDJjYW52YXMoZG9jdW1lbnQuYm9keSwgeyB1c2VDT1JTOiB0cnVlLCBsb2dnaW5nOiB0cnVlIH0pLnRoZW4oY2FudmFzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW5zaG90Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydFRhYi5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBjYXB0dXJpbmcgc2NyZWVuc2hvdDonLCBlcnJvcikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1zY3JlZW5zaG90JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdGF0aW9uLW1vZGFsJyk7XG4gICAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbnNob3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgZmFicmljQ2FudmFzID0gbmV3IGZhYnJpYy5DYW52YXMoJ2Fubm90YXRpb24tY2FudmFzJywge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZhYnJpYy5JbWFnZS5mcm9tVVJMKGltZy5zcmMsIGZ1bmN0aW9uKG9JbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5ub3RhdGlvbi1lZGl0b3InKS5jbGllbnRXaWR0aCAtIDQwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3JIZWlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5ub3RhdGlvbi1lZGl0b3InKS5jbGllbnRIZWlnaHQgLSA4MDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1pbihlZGl0b3JXaWR0aCAvIG9JbWcud2lkdGgsIGVkaXRvckhlaWdodCAvIG9JbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgb0ltZy5zY2FsZShzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5zZXRXaWR0aChvSW1nLndpZHRoICogc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuc2V0SGVpZ2h0KG9JbWcuaGVpZ2h0ICogc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuc2V0QmFja2dyb3VuZEltYWdlKG9JbWcsIGZhYnJpY0NhbnZhcy5yZW5kZXJBbGwuYmluZChmYWJyaWNDYW52YXMpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLWFycm93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJvdyA9IG5ldyBmYWJyaWMuUGF0aCgnTSAwIDAgTCAwIDQgTCAyIDQgTCAyIDggTCA4IDIgTCAyIC00IEwgMiAwIFonLCB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIGZpbGw6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZVg6IDUsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWTogNSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLmFkZChhcnJvdyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10ZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KCdFbnRlciB0ZXh0IGhlcmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgICAgICAgICBjb3JuZXJDb2xvcjogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgY29ybmVyU2l6ZTogNixcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRDb3JuZXJzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGluZ0JvcmRlckNvbG9yOiAnYmx1ZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuYWRkKHRleHQpLnNldEFjdGl2ZU9iamVjdCh0ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLWl0ZW0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZU9iamVjdCA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5yZW1vdmUoYWN0aXZlT2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtYW5ub3RhdGlvbnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tbW9kYWwnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuc2hvdCcpO1xuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBmYWJyaWNDYW52YXMudG9EYXRhVVJMKHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAncG5nJyxcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogMC44XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kLXJlcG9ydCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyZWVuc2hvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW5zaG90Jykuc3JjO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZVVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2Rlc2NyaXB0aW9uJywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnc2NyZWVuc2hvdCcsIHNjcmVlbnNob3QpO1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncHJvamVjdElkJywgY3VycmVudFByb2plY3RJZCk7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwYWdlVXJsJywgcGFnZVVybCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBwLm1pbGxpb25sYWJzLmNvLnVrL3ZlcnNpb24tJHt2ZXJzaW9ufS9hcGkvMS4xL3dmL2J1Z3JlcG9ydGAsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZm9ybURhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0J1ZyByZXBvcnQgc2VudCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1Z1JlcG9ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1Z1JlcG9ydFRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0LXRhYicpO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnQuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnRUYWIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyBidWcgcmVwb3J0OicsIGVycm9yKSk7XG4gICAgICAgICAgICB9KTtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9idWdUcmFja2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImJ1Zy1yZXBvcnQtdGFiXFxcIj5SZXBvcnQgQnVnPC9kaXY+XFxuPGRpdiBpZD1cXFwiYnVnLXJlcG9ydFxcXCI+XFxuICAgIDxpbWcgaWQ9XFxcImxvZ29cXFwiIHNyYz1cXFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2FwcGZvcmVzdF91Zi9mMTYyMzQyODk5NjM3Mng0NTQwMjQxNzEzMjgyMDQ1MDAvTUxhYnNCb3R0bGVCdWJibGluZ1doaXRldjIuZ2lmXFxcIiBhbHQ9XFxcIkxvZ29cXFwiIHdpZHRoPVxcXCI1MFxcXCIgaGVpZ2h0PVxcXCI1MFxcXCI+XFxuICAgIDx0ZXh0YXJlYSBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHBsYWNlaG9sZGVyPVxcXCJEZXNjcmliZSB0aGUgYnVnXFxcIj48L3RleHRhcmVhPlxcbiAgICA8aW1nIGlkPVxcXCJzY3JlZW5zaG90XFxcIiBhbHQ9XFxcIlNjcmVlbnNob3RcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJlZGl0LXNjcmVlbnNob3RcXFwiPkVkaXQgU2NyZWVuc2hvdDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzZW5kLXJlcG9ydFxcXCI+U2VuZCBSZXBvcnQ8L2J1dHRvbj5cXG48L2Rpdj5cXG5cXG48ZGl2IGlkPVxcXCJhbm5vdGF0aW9uLW1vZGFsXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwiYW5ub3RhdGlvbi1lZGl0b3JcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwidG9vbHNcXFwiPlxcbiAgICAgICAgICAgIDxpbWcgaWQ9XFxcImFkZC1hcnJvd1xcXCIgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yNS8yNTI5OC5wbmdcXFwiIGFsdD1cXFwiQWRkIEFycm93XFxcIj5cXG4gICAgICAgICAgICA8aW1nIGlkPVxcXCJhZGQtdGV4dFxcXCIgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xODI4LzE4Mjg5MTEucG5nXFxcIiBhbHQ9XFxcIkFkZCBUZXh0XFxcIj5cXG48YnV0dG9uIGlkPVxcXCJkZWxldGUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi81NjUvNTY1OTIyLnBuZ1xcXCIgYWx0PVxcXCJEZWxldGUgSXRlbVxcXCI+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwic2F2ZS1hbm5vdGF0aW9uc1xcXCI+U2F2ZSBBbm5vdGF0aW9uczwvYnV0dG9uPlxcbiAgICAgICAgXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxjYW52YXMgaWQ9XFxcImFubm90YXRpb24tY2FudmFzXFxcIj48L2NhbnZhcz5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuXFxuPHNjcmlwdCBzcmM9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2h0bWwyY2FudmFzLzEuNC4xL2h0bWwyY2FudmFzLm1pbi5qc1xcXCI+PC9zY3JpcHQ+XFxuPHNjcmlwdCBzcmM9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZhYnJpYy5qcy80LjUuMC9mYWJyaWMubWluLmpzXFxcIj48L3NjcmlwdD5cXG48c2NyaXB0PlxcbiAgIFxcbjwvc2NyaXB0PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvYnVnVHJhY2tlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNidWctcmVwb3J0LXRhYiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4jYnVnLXJlcG9ydCB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcmlnaHQ6IC0zNDVweDtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgd2lkdGg6IDMyMHB4O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLDAsMCwwLjEpO1xcbiAgICB0cmFuc2l0aW9uOiByaWdodCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICB6LWluZGV4OiA5OTk7XFxufVxcblxcbiNidWctcmVwb3J0Lm9wZW4ge1xcbiAgICByaWdodDogMDtcXG59XFxuXFxuI2J1Zy1yZXBvcnQgdGV4dGFyZWEge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuI2J1Zy1yZXBvcnQgaW1nIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNGRjY3Mzc7XFxufVxcblxcbiNzZW5kLXJlcG9ydCwgI2VkaXQtc2NyZWVuc2hvdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1tb2RhbCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMTAwMDA7XFxufVxcblxcbiNhbm5vdGF0aW9uLW1vZGFsLm9wZW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1lZGl0b3Ige1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkY2NzM3O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsMCwwLDAuMSk7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1jYW52YXMge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkY2NzM3O1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2xvZ28ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgbWFyZ2luOiAwIGF1dG8gMTBweDtcXG4gICAgd2lkdGg6IDUwcHggIWltcG9ydGFudDtcXG4gICAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi50b29sLWljb24ge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICBtYXJnaW46IDVweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jdG9vbHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IHN0aWNreTtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgei1pbmRleDogMTAwMTtcXG4gICAgcGFkZGluZzogMTBweCAwO1xcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0ZGNjczNztcXG4gICAgd2lkdGg6IDEwMCU7XFxufVxcblxcbiNzYXZlLWFubm90YXRpb25zIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNjczNztcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI2RlbGV0ZS1pdGVtIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNjczNztcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zcmMvdmlld3MvYnVnVHJhY2tlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=