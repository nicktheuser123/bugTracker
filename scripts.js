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
        console.log("RUNNING Indside bug report tab");
        var bugReport = document.getElementById('bug-report');
        var bugReportTab = document.getElementById('bug-report-tab');
        if (bugReport.classList.contains('open')) {
          bugReport.classList.remove('open');
          bugReportTab.style.display = 'block';
        } else {
          bugReport.classList.add('open');
          bugReportTab.style.display = 'none';
          html2canvas(document.body, {
            useCORS: true,
            logging: true
          }).then(function (canvas) {
            var img = document.getElementById('screenshot');
            img.src = canvas.toDataURL();
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
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGEzNDllMjU0MGM2NzQwZjhhNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9idWdUcmFja2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzP2IyODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkQVBJIiwiYXBwIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImNvbmZpZ3VyYXRpb25zIiwic29tZURlZmF1bHRDb25maWd1cmF0aW9uIiwiZ2xvYmFsT2JqZWN0IiwicXVldWUiLCJxIiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwiZXh0ZW5kT2JqZWN0Iiwic2hvdyIsImFwaUhhbmRsZXIiLCJhcGkiLCJwYXJhbXMiLCJFcnJvciIsImluZGV4T2YiLCJjb25jYXQiLCJ3YXJuIiwiYSIsImIiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInBpbmciLCJlbGVtZW50cyIsImJvZHkiLCJmYWJyaWNDYW52YXMiLCJ0ZXh0IiwidGVtcG9yYXJ5IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaHRtbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2hpbGRyZW4iLCJwdXNoIiwiYXBwZW5kQ2hpbGQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidWdSZXBvcnQiLCJidWdSZXBvcnRUYWIiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsInN0eWxlIiwiZGlzcGxheSIsImFkZCIsImh0bWwyY2FudmFzIiwidXNlQ09SUyIsImxvZ2dpbmciLCJ0aGVuIiwiY2FudmFzIiwiaW1nIiwic3JjIiwidG9EYXRhVVJMIiwiZXJyb3IiLCJtb2RhbCIsImNhbnZhc0VsZW1lbnQiLCJmYWJyaWMiLCJDYW52YXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJJbWFnZSIsImZyb21VUkwiLCJvSW1nIiwiZWRpdG9yV2lkdGgiLCJjbGllbnRXaWR0aCIsImVkaXRvckhlaWdodCIsImNsaWVudEhlaWdodCIsInNjYWxlIiwiTWF0aCIsIm1pbiIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0V2lkdGgiLCJzZXRIZWlnaHQiLCJzZXRCYWNrZ3JvdW5kSW1hZ2UiLCJyZW5kZXJBbGwiLCJiaW5kIiwiYXJyb3ciLCJQYXRoIiwibGVmdCIsInRvcCIsImZpbGwiLCJzY2FsZVgiLCJzY2FsZVkiLCJvcmlnaW5YIiwib3JpZ2luWSIsIlRleHRib3giLCJmb250U2l6ZSIsImJvcmRlckNvbG9yIiwiY29ybmVyQ29sb3IiLCJjb3JuZXJTaXplIiwidHJhbnNwYXJlbnRDb3JuZXJzIiwiZWRpdGluZ0JvcmRlckNvbG9yIiwic2V0QWN0aXZlT2JqZWN0IiwiYWN0aXZlT2JqZWN0IiwiZ2V0QWN0aXZlT2JqZWN0IiwiZm9ybWF0IiwicXVhbGl0eSIsInNjcmVlbnNob3QiLCJkZXNjcmlwdGlvbiIsInZhbHVlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJhbGVydCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQUE7QUFBaUM7QUFDUTtBQUV6QyxJQUFNQSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQzs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsR0FBR0EsQ0FBQ0MsTUFBTSxFQUFFO0VBQ2pCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzs7RUFFakM7RUFDQSxJQUFJQyxjQUFjLEdBQUc7SUFDakJDLHdCQUF3QixFQUFFO0VBQzlCLENBQUM7O0VBRUQ7RUFDQTtFQUNBLElBQUlDLFlBQVksR0FBR0wsTUFBTSxDQUFDQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDOUMsSUFBSU0sS0FBSyxHQUFHRCxZQUFZLENBQUNFLENBQUM7RUFDMUIsSUFBSUQsS0FBSyxFQUFFO0lBQ1AsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUNuQyxJQUFJRixLQUFLLENBQUNFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDRSxXQUFXLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRTtRQUNyQ1AsY0FBYyxHQUFHUSxZQUFZLENBQUNSLGNBQWMsRUFBRUcsS0FBSyxDQUFDRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxREksdUVBQUksQ0FBQyxDQUFDO1FBQ05YLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixFQUFFQyxjQUFjLENBQUM7TUFDcEQsQ0FBQyxNQUVHVSxVQUFVLENBQUNQLEtBQUssQ0FBQ0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVGLEtBQUssQ0FBQ0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUM7RUFDSjs7RUFFQTtFQUNBO0VBQ0FILFlBQVksR0FBR1EsVUFBVTtFQUN6QlIsWUFBWSxDQUFDRixjQUFjLEdBQUdBLGNBQWM7QUFHaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU1UsVUFBVUEsQ0FBQ0MsR0FBRyxFQUFFQyxNQUFNLEVBQUU7RUFDN0IsSUFBSSxDQUFDRCxHQUFHLEVBQUUsTUFBTUUsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0VBQzVDRixHQUFHLEdBQUdBLEdBQUcsQ0FBQ0osV0FBVyxDQUFDLENBQUM7RUFFdkIsSUFBSVosWUFBWSxDQUFDbUIsT0FBTyxDQUFDSCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNRSxLQUFLLFdBQUFFLE1BQUEsQ0FBV0osR0FBRyxzQkFBbUIsQ0FBQztFQUVuRmIsT0FBTyxDQUFDQyxHQUFHLHNCQUFBZ0IsTUFBQSxDQUFzQkosR0FBRyxHQUFJQyxNQUFNLENBQUM7RUFFL0MsUUFBUUQsR0FBRztJQUNQO0lBQ0EsS0FBSyxPQUFPO01BQ1JGLHVFQUFJLENBQUNHLE1BQU0sQ0FBQztNQUNaO0lBQ0o7TUFDSWQsT0FBTyxDQUFDa0IsSUFBSSwyQkFBQUQsTUFBQSxDQUEyQkosR0FBRyxDQUFFLENBQUM7RUFDckQ7QUFDSjtBQUVBLFNBQVNILFlBQVlBLENBQUNTLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQ3hCLEtBQUssSUFBSUMsR0FBRyxJQUFJRCxDQUFDLEVBQ2IsSUFBSUEsQ0FBQyxDQUFDRSxjQUFjLENBQUNELEdBQUcsQ0FBQyxFQUNyQkYsQ0FBQyxDQUFDRSxHQUFHLENBQUMsR0FBR0QsQ0FBQyxDQUFDQyxHQUFHLENBQUM7RUFDdkIsT0FBT0YsQ0FBQztBQUNaO0FBRUFyQixHQUFHLENBQUNDLE1BQU0sQ0FBQyxDOzs7Ozs7O0FDbkVYO0FBQU8sU0FBU3dCLElBQUlBLENBQUEsRUFBRztFQUNuQixPQUFPLE1BQU07QUFDakIsQzs7Ozs7OztBQ0hBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBcUM7QUFDWDtBQUUxQixJQUFJQyxRQUFRLEdBQUcsRUFBRTtBQUNqQixJQUFJQyxJQUFJO0FBQ1IsSUFBSUMsWUFBWTtBQUVULFNBQVNmLElBQUlBLENBQUNnQixJQUFJLEVBQUU7RUFDdkI7RUFDQSxJQUFJQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM3Q0YsU0FBUyxDQUFDRyxTQUFTLEdBQUdDLHdEQUFJO0VBQzNCOztFQUVDO0VBQ0FQLElBQUksR0FBR0ksUUFBUSxDQUFDSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0MsT0FBT0wsU0FBUyxDQUFDTSxRQUFRLENBQUMxQixNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ2xDZ0IsUUFBUSxDQUFDVyxJQUFJLENBQUNQLFNBQVMsQ0FBQ00sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDVCxJQUFJLENBQUNXLFdBQVcsQ0FBQ1IsU0FBUyxDQUFDTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0M7RUFJUUwsUUFBUSxDQUFDUSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDM0V0QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUM3QyxJQUFNc0MsU0FBUyxHQUFHVixRQUFRLENBQUNRLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFDdkQsSUFBTUcsWUFBWSxHQUFHWCxRQUFRLENBQUNRLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUU5RCxJQUFJRSxTQUFTLENBQUNFLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO01BQ3RDSCxTQUFTLENBQUNFLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUNsQ0gsWUFBWSxDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0lBQ3hDLENBQUMsTUFBTTtNQUNITixTQUFTLENBQUNFLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMvQk4sWUFBWSxDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO01BQ25DRSxXQUFXLENBQUNsQixRQUFRLENBQUNKLElBQUksRUFBRTtRQUFFdUIsT0FBTyxFQUFFLElBQUk7UUFBRUMsT0FBTyxFQUFFO01BQUssQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFBQyxNQUFNLEVBQUk7UUFDeEUsSUFBTUMsR0FBRyxHQUFHdkIsUUFBUSxDQUFDUSxjQUFjLENBQUMsWUFBWSxDQUFDO1FBQ2pEZSxHQUFHLENBQUNDLEdBQUcsR0FBR0YsTUFBTSxDQUFDRyxTQUFTLENBQUMsQ0FBQztNQUNoQyxDQUFDLENBQUMsU0FBTSxDQUFDLFVBQUFDLEtBQUs7UUFBQSxPQUFJdkQsT0FBTyxDQUFDdUQsS0FBSyxDQUFDLDZCQUE2QixFQUFFQSxLQUFLLENBQUM7TUFBQSxFQUFDO0lBQzFFO0VBQ0osQ0FBQyxDQUFDO0VBRUYxQixRQUFRLENBQUNRLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUM1RSxJQUFNa0IsS0FBSyxHQUFHM0IsUUFBUSxDQUFDUSxjQUFjLENBQUMsa0JBQWtCLENBQUM7SUFDekRtQixLQUFLLENBQUNmLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUUzQixJQUFNTSxHQUFHLEdBQUd2QixRQUFRLENBQUNRLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFDakQsSUFBTW9CLGFBQWEsR0FBRzVCLFFBQVEsQ0FBQ1EsY0FBYyxDQUFDLG1CQUFtQixDQUFDO0lBQ2xFWCxZQUFZLEdBQUcsSUFBSWdDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLG1CQUFtQixFQUFFO01BQ2xEQyxlQUFlLEVBQUU7SUFDckIsQ0FBQyxDQUFDO0lBRUZGLE1BQU0sQ0FBQ0csS0FBSyxDQUFDQyxPQUFPLENBQUNWLEdBQUcsQ0FBQ0MsR0FBRyxFQUFFLFVBQVNVLElBQUksRUFBRTtNQUN6QyxJQUFNQyxXQUFXLEdBQUduQyxRQUFRLENBQUNRLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDNEIsV0FBVyxHQUFHLEVBQUU7TUFDakYsSUFBTUMsWUFBWSxHQUFHckMsUUFBUSxDQUFDUSxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzhCLFlBQVksR0FBRyxFQUFFO01BQ25GLElBQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUNOLFdBQVcsR0FBR0QsSUFBSSxDQUFDUSxLQUFLLEVBQUVMLFlBQVksR0FBR0gsSUFBSSxDQUFDUyxNQUFNLENBQUM7TUFDNUVULElBQUksQ0FBQ0ssS0FBSyxDQUFDQSxLQUFLLENBQUM7TUFDakIxQyxZQUFZLENBQUMrQyxRQUFRLENBQUNWLElBQUksQ0FBQ1EsS0FBSyxHQUFHSCxLQUFLLENBQUM7TUFDekMxQyxZQUFZLENBQUNnRCxTQUFTLENBQUNYLElBQUksQ0FBQ1MsTUFBTSxHQUFHSixLQUFLLENBQUM7TUFDM0MxQyxZQUFZLENBQUNpRCxrQkFBa0IsQ0FBQ1osSUFBSSxFQUFFckMsWUFBWSxDQUFDa0QsU0FBUyxDQUFDQyxJQUFJLENBQUNuRCxZQUFZLENBQUMsQ0FBQztJQUNwRixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRkcsUUFBUSxDQUFDUSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO0lBQ3RFLElBQU13QyxLQUFLLEdBQUcsSUFBSXBCLE1BQU0sQ0FBQ3FCLElBQUksQ0FBQyw4Q0FBOEMsRUFBRTtNQUMxRUMsSUFBSSxFQUFFLEdBQUc7TUFDVEMsR0FBRyxFQUFFLEdBQUc7TUFDUkMsSUFBSSxFQUFFLEtBQUs7TUFDWEMsTUFBTSxFQUFFLENBQUM7TUFDVEMsTUFBTSxFQUFFLENBQUM7TUFDVEMsT0FBTyxFQUFFLFFBQVE7TUFDakJDLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUNGNUQsWUFBWSxDQUFDb0IsR0FBRyxDQUFDZ0MsS0FBSyxDQUFDO0VBQzNCLENBQUMsQ0FBQztFQUVGakQsUUFBUSxDQUFDUSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO0lBQ3JFLElBQU1YLElBQUksR0FBRyxJQUFJK0IsTUFBTSxDQUFDNkIsT0FBTyxDQUFDLGlCQUFpQixFQUFFO01BQy9DUCxJQUFJLEVBQUUsR0FBRztNQUNUQyxHQUFHLEVBQUUsR0FBRztNQUNSVixLQUFLLEVBQUUsR0FBRztNQUNWaUIsUUFBUSxFQUFFLEVBQUU7TUFDWkMsV0FBVyxFQUFFLEtBQUs7TUFDbEJDLFdBQVcsRUFBRSxPQUFPO01BQ3BCQyxVQUFVLEVBQUUsQ0FBQztNQUNiQyxrQkFBa0IsRUFBRSxLQUFLO01BQ3pCQyxrQkFBa0IsRUFBRTtJQUN4QixDQUFDLENBQUM7SUFDRm5FLFlBQVksQ0FBQ29CLEdBQUcsQ0FBQ25CLElBQUksQ0FBQyxDQUFDbUUsZUFBZSxDQUFDbkUsSUFBSSxDQUFDO0VBQ2hELENBQUMsQ0FBQztFQUVGRSxRQUFRLENBQUNRLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVc7SUFDeEUsSUFBTXlELFlBQVksR0FBR3JFLFlBQVksQ0FBQ3NFLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELElBQUlELFlBQVksRUFBRTtNQUNkckUsWUFBWSxDQUFDaUIsTUFBTSxDQUFDb0QsWUFBWSxDQUFDO0lBQ3JDO0VBQ0osQ0FBQyxDQUFDO0VBRUZsRSxRQUFRLENBQUNRLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUM3RSxJQUFNa0IsS0FBSyxHQUFHM0IsUUFBUSxDQUFDUSxjQUFjLENBQUMsa0JBQWtCLENBQUM7SUFDekQsSUFBTWUsR0FBRyxHQUFHdkIsUUFBUSxDQUFDUSxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQ2pEZSxHQUFHLENBQUNDLEdBQUcsR0FBRzNCLFlBQVksQ0FBQzRCLFNBQVMsQ0FBQztNQUM3QjJDLE1BQU0sRUFBRSxLQUFLO01BQ2JDLE9BQU8sRUFBRTtJQUNiLENBQUMsQ0FBQztJQUNGMUMsS0FBSyxDQUFDZixTQUFTLENBQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbEMsQ0FBQyxDQUFDO0VBRUZkLFFBQVEsQ0FBQ1EsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztJQUN4RSxJQUFNNkQsVUFBVSxHQUFHdEUsUUFBUSxDQUFDUSxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUNnQixHQUFHO0lBQzVELElBQU0rQyxXQUFXLEdBQUd2RSxRQUFRLENBQUNRLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQ2dFLEtBQUs7SUFFaEUsSUFBTUMsUUFBUSxHQUFHLElBQUlDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CRCxRQUFRLENBQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUVKLFdBQVcsQ0FBQztJQUMzQ0UsUUFBUSxDQUFDRSxNQUFNLENBQUMsWUFBWSxFQUFFTCxVQUFVLENBQUM7SUFFekNNLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRTtNQUN6Q0MsTUFBTSxFQUFFLE1BQU07TUFDZEMsT0FBTyxFQUFFO1FBQ0wsUUFBUSxFQUFFO01BQ2QsQ0FBQztNQUNEbEYsSUFBSSxFQUFFNkU7SUFDVixDQUFDLENBQUMsQ0FDRHBELElBQUksQ0FBQyxVQUFBMEQsUUFBUTtNQUFBLE9BQUlBLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7SUFBQSxFQUFDLENBQ2pDM0QsSUFBSSxDQUFDLFVBQUE0RCxJQUFJLEVBQUk7TUFDVkMsS0FBSyxDQUFDLCtCQUErQixDQUFDO01BQ3RDLElBQU14RSxTQUFTLEdBQUdWLFFBQVEsQ0FBQ1EsY0FBYyxDQUFDLFlBQVksQ0FBQztNQUN2RCxJQUFNRyxZQUFZLEdBQUdYLFFBQVEsQ0FBQ1EsY0FBYyxDQUFDLGdCQUFnQixDQUFDO01BQzlERSxTQUFTLENBQUNFLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUNsQ0gsWUFBWSxDQUFDSSxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0lBQ3hDLENBQUMsQ0FBQyxTQUNJLENBQUMsVUFBQVUsS0FBSztNQUFBLE9BQUl2RCxPQUFPLENBQUN1RCxLQUFLLENBQUMsMkJBQTJCLEVBQUVBLEtBQUssQ0FBQztJQUFBLEVBQUM7RUFDdEUsQ0FBQyxDQUFDO0FBRWQsQzs7Ozs7O0FDcElBLDY2Qzs7Ozs7O0FDQUE7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMsQ0FBOEQ7QUFDcEYsNENBQTRDLFFBQVM7QUFDckQ7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxDQUFtRDtBQUN4RTtBQUNBO0FBQ0EsR0FBRyxLQUFVO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7OztBQ3pCQTtBQUNBLGtDQUFrQyxtQkFBTyxDQUFDLENBQW1EO0FBQzdGO0FBQ0E7QUFDQSxjQUFjLFFBQVMsb0JBQW9CLHNCQUFzQixlQUFlLGVBQWUsa0NBQWtDLGdDQUFnQyxtQkFBbUIsb0JBQW9CLHNCQUFzQixvQkFBb0IsR0FBRyxpQkFBaUIsc0JBQXNCLG9CQUFvQixlQUFlLGtDQUFrQyxtQkFBbUIsb0JBQW9CLHdCQUF3Qiw2QkFBNkIsb0JBQW9CLDJDQUEyQyx5Q0FBeUMsbUJBQW1CLEdBQUcsc0JBQXNCLGVBQWUsR0FBRywwQkFBMEIsa0JBQWtCLG9CQUFvQiwwQkFBMEIsR0FBRyxxQkFBcUIscUJBQXFCLGtCQUFrQixtQkFBbUIsMEJBQTBCLGdDQUFnQyxHQUFHLG9DQUFvQyxnQ0FBZ0MsbUJBQW1CLG1CQUFtQixvQkFBb0Isc0JBQXNCLGtCQUFrQiwwQkFBMEIsR0FBRyx1QkFBdUIsb0JBQW9CLHNCQUFzQixhQUFhLGNBQWMsa0JBQWtCLG1CQUFtQix5Q0FBeUMsOEJBQThCLDBCQUEwQixxQkFBcUIsR0FBRyw0QkFBNEIsb0JBQW9CLEdBQUcsd0JBQXdCLHdCQUF3QixvQkFBb0IseUJBQXlCLGdDQUFnQywyQ0FBMkMsaUJBQWlCLGtCQUFrQixvQkFBb0IsNkJBQTZCLDBCQUEwQixHQUFHLHdCQUF3QixnQ0FBZ0Msd0JBQXdCLGtCQUFrQixtQkFBbUIsR0FBRyxXQUFXLHFCQUFxQiwwQkFBMEIsa0JBQWtCLG1CQUFtQixHQUFHLGdCQUFnQixrQkFBa0IsbUJBQW1CLGtCQUFrQixzQkFBc0IsR0FBRyxZQUFZLG9CQUFvQiw4QkFBOEIsdUJBQXVCLGFBQWEsd0JBQXdCLG9CQUFvQixzQkFBc0IsdUNBQXVDLGtCQUFrQixHQUFHLHVCQUF1QixnQ0FBZ0MsbUJBQW1CLG1CQUFtQixvQkFBb0Isc0JBQXNCLHdCQUF3Qix5QkFBeUIsR0FBRyxrQkFBa0IsZ0NBQWdDLG1CQUFtQixtQkFBbUIsb0JBQW9CLHNCQUFzQix3QkFBd0IseUJBQXlCLEdBQUc7QUFDaCtFO0FBQ0E7Ozs7Ozs7O0FDTmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxQkFBcUI7QUFDakU7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHFCQUFxQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCOztBQUU5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxjQUFjO0FBQ25FO0FBQ0EsQzs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsQ0FBUTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBLG1CQUFtQiwyQkFBMkI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0E7O0FBRUEsUUFBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZCxrREFBa0Qsc0JBQXNCO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YTM0OWUyNTQwYzY3NDBmOGE2ZiIsImltcG9ydCB7IHBpbmcgfSBmcm9tICcuL3NlcnZpY2VzJ1xuaW1wb3J0IHsgc2hvdyB9IGZyb20gJy4vdmlld3MvYnVnVHJhY2tlcidcblxuY29uc3Qgc3VwcG9ydGVkQVBJID0gWydpbml0JywgJ3RyYWNrJyBdOyAvLyBlbmxpc3QgYWxsIG1ldGhvZHMgc3VwcG9ydGVkIGJ5IEFQSSAoZS5nLiBgbXcoJ2V2ZW50JywgJ3VzZXItbG9naW4nKTtgKVxuXG4vKipcbiAgICBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAqL1xuZnVuY3Rpb24gYXBwKHdpbmRvdykge1xuICAgIGNvbnNvbGUubG9nKCdKUy1XaWRnZXQgc3RhcnRpbmcnKTtcblxuICAgIC8vIHNldCBkZWZhdWx0IGNvbmZpZ3VyYXRpb25zXG4gICAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICAgICAgICBzb21lRGVmYXVsdENvbmZpZ3VyYXRpb246IGZhbHNlXG4gICAgfTtcblxuICAgIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNhbGxlZCBub3cgXG4gICAgbGV0IGdsb2JhbE9iamVjdCA9IHdpbmRvd1t3aW5kb3dbJ0pTLVdpZGdldCddXTtcbiAgICBsZXQgcXVldWUgPSBnbG9iYWxPYmplY3QucTtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHF1ZXVlW2ldWzBdLnRvTG93ZXJDYXNlKCkgPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0pTLVdpZGdldCBzdGFydGVkJywgY29uZmlndXJhdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGFwaUhhbmRsZXIocXVldWVbaV1bMF0sIHF1ZXVlW2ldWzFdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgICAvLyBmb3Igd2lkZ2V0J3MgQVBJIGNhbGxzXG4gICAgZ2xvYmFsT2JqZWN0ID0gYXBpSGFuZGxlcjtcbiAgICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcblxuICAgIFxufVxuXG4vKipcbiAgICBNZXRob2QgdGhhdCBoYW5kbGVzIGFsbCBBUEkgY2FsbHNcbiAgICAqL1xuZnVuY3Rpb24gYXBpSGFuZGxlcihhcGksIHBhcmFtcykge1xuICAgIGlmICghYXBpKSB0aHJvdyBFcnJvcignQVBJIG1ldGhvZCByZXF1aXJlZCcpO1xuICAgIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHN1cHBvcnRlZEFQSS5pbmRleE9mKGFwaSkgPT09IC0xKSB0aHJvdyBFcnJvcihgTWV0aG9kICR7YXBpfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG5cbiAgICBjb25zb2xlLmxvZyhgSGFuZGxpbmcgQVBJIGNhbGwgJHthcGl9YCwgcGFyYW1zKTtcblxuICAgIHN3aXRjaCAoYXBpKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBBUEkgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY2FzZSAndHJhY2snOlxuICAgICAgICAgICAgc2hvdyhwYXJhbXMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vIGhhbmRsZXIgZGVmaW5lZCBmb3IgJHthcGl9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKVxuICAgICAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIHJldHVybiBhO1xufVxuXG5hcHAod2luZG93KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIHBpbmcoKSB7XG4gICAgcmV0dXJuICdwb25nJztcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmljZXMuanMiLCJpbXBvcnQgaHRtbCBmcm9tICcuL2J1Z1RyYWNrZXIuaHRtbCc7XG5pbXBvcnQgJy4vYnVnVHJhY2tlci5jc3MnO1xuXG5sZXQgZWxlbWVudHMgPSBbXTtcbmxldCBib2R5O1xubGV0IGZhYnJpY0NhbnZhcztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3codGV4dCkge1xuICAgIC8vIGNvbnZlcnQgcGxhaW4gSFRNTCBzdHJpbmcgaW50byBET00gZWxlbWVudHNcbiAgICBsZXQgdGVtcG9yYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcG9yYXJ5LmlubmVySFRNTCA9IGh0bWw7XG4gICAvLyB0ZW1wb3JhcnkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtd2lkZ2V0LWRpYWxvZycpWzBdLnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgIC8vIGFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgd2hpbGUgKHRlbXBvcmFyeS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGVtcG9yYXJ5LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0ZW1wb3JhcnkuY2hpbGRyZW5bMF0pO1xuICAgIH1cblxuICAgIFxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVnLXJlcG9ydC10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUlVOTklORyBJbmRzaWRlIGJ1ZyByZXBvcnQgdGFiXCIpXG4gICAgICAgICAgICAgICAgY29uc3QgYnVnUmVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1Zy1yZXBvcnQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBidWdSZXBvcnRUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnVnLXJlcG9ydC10YWInKTtcblxuICAgICAgICAgICAgICAgIGlmIChidWdSZXBvcnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnVnUmVwb3J0VGFiLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Z1JlcG9ydFRhYi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBodG1sMmNhbnZhcyhkb2N1bWVudC5ib2R5LCB7IHVzZUNPUlM6IHRydWUsIGxvZ2dpbmc6IHRydWUgfSkudGhlbihjYW52YXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbnNob3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNhcHR1cmluZyBzY3JlZW5zaG90OicsIGVycm9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXNjcmVlbnNob3QnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fubm90YXRpb24tbW9kYWwnKTtcbiAgICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuc2hvdCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5ub3RhdGlvbi1jYW52YXMnKTtcbiAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMgPSBuZXcgZmFicmljLkNhbnZhcygnYW5ub3RhdGlvbi1jYW52YXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZmFicmljLkltYWdlLmZyb21VUkwoaW1nLnNyYywgZnVuY3Rpb24ob0ltZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3JXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdGF0aW9uLWVkaXRvcicpLmNsaWVudFdpZHRoIC0gNDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRvckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbm5vdGF0aW9uLWVkaXRvcicpLmNsaWVudEhlaWdodCAtIDgwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IE1hdGgubWluKGVkaXRvcldpZHRoIC8gb0ltZy53aWR0aCwgZWRpdG9ySGVpZ2h0IC8gb0ltZy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBvSW1nLnNjYWxlKHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLnNldFdpZHRoKG9JbWcud2lkdGggKiBzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5zZXRIZWlnaHQob0ltZy5oZWlnaHQgKiBzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5zZXRCYWNrZ3JvdW5kSW1hZ2Uob0ltZywgZmFicmljQ2FudmFzLnJlbmRlckFsbC5iaW5kKGZhYnJpY0NhbnZhcykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtYXJyb3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKCdNIDAgMCBMIDAgNCBMIDIgNCBMIDIgOCBMIDggMiBMIDIgLTQgTCAyIDAgWicsIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWDogNSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVZOiA1LFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuYWRkKGFycm93KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRleHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3goJ0VudGVyIHRleHQgaGVyZScsIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMTAwLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgIGNvcm5lckNvbG9yOiAnZ3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICBjb3JuZXJTaXplOiA2LFxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudENvcm5lcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBlZGl0aW5nQm9yZGVyQ29sb3I6ICdibHVlJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5hZGQodGV4dCkuc2V0QWN0aXZlT2JqZWN0KHRleHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxldGUtaXRlbScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlT2JqZWN0ID0gZmFicmljQ2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzLnJlbW92ZShhY3RpdmVPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1hbm5vdGF0aW9ucycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5ub3RhdGlvbi1tb2RhbCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW5zaG90Jyk7XG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IGZhYnJpY0NhbnZhcy50b0RhdGFVUkwoe1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdwbmcnLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAwLjhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmQtcmVwb3J0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JlZW5zaG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbnNob3QnKS5zcmM7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3NjcmVlbnNob3QnLCBzY3JlZW5zaG90KTtcblxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2Zvcm1zcHJlZS5pby9mL1lPVVJfRk9STV9JRCcsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZm9ybURhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0J1ZyByZXBvcnQgc2VudCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1Z1JlcG9ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1Z1JlcG9ydFRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidWctcmVwb3J0LXRhYicpO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnQuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBidWdSZXBvcnRUYWIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3Igc2VuZGluZyBidWcgcmVwb3J0OicsIGVycm9yKSk7XG4gICAgICAgICAgICB9KTtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9idWdUcmFja2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImJ1Zy1yZXBvcnQtdGFiXFxcIj5SZXBvcnQgQnVnPC9kaXY+XFxuPGRpdiBpZD1cXFwiYnVnLXJlcG9ydFxcXCI+XFxuICAgIDxpbWcgaWQ9XFxcImxvZ29cXFwiIHNyYz1cXFwiaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2FwcGZvcmVzdF91Zi9mMTYyMzQyODk5NjM3Mng0NTQwMjQxNzEzMjgyMDQ1MDAvTUxhYnNCb3R0bGVCdWJibGluZ1doaXRldjIuZ2lmXFxcIiBhbHQ9XFxcIkxvZ29cXFwiIHdpZHRoPVxcXCI1MFxcXCIgaGVpZ2h0PVxcXCI1MFxcXCI+XFxuICAgIDx0ZXh0YXJlYSBpZD1cXFwiZGVzY3JpcHRpb25cXFwiIHBsYWNlaG9sZGVyPVxcXCJEZXNjcmliZSB0aGUgYnVnXFxcIj48L3RleHRhcmVhPlxcbiAgICA8aW1nIGlkPVxcXCJzY3JlZW5zaG90XFxcIiBhbHQ9XFxcIlNjcmVlbnNob3RcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJlZGl0LXNjcmVlbnNob3RcXFwiPkVkaXQgU2NyZWVuc2hvdDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJzZW5kLXJlcG9ydFxcXCI+U2VuZCBSZXBvcnQ8L2J1dHRvbj5cXG48L2Rpdj5cXG5cXG48ZGl2IGlkPVxcXCJhbm5vdGF0aW9uLW1vZGFsXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwiYW5ub3RhdGlvbi1lZGl0b3JcXFwiPlxcbiAgICAgICAgPGRpdiBpZD1cXFwidG9vbHNcXFwiPlxcbiAgICAgICAgICAgIDxpbWcgaWQ9XFxcImFkZC1hcnJvd1xcXCIgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8yNS8yNTI5OC5wbmdcXFwiIGFsdD1cXFwiQWRkIEFycm93XFxcIj5cXG4gICAgICAgICAgICA8aW1nIGlkPVxcXCJhZGQtdGV4dFxcXCIgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi8xODI4LzE4Mjg5MTEucG5nXFxcIiBhbHQ9XFxcIkFkZCBUZXh0XFxcIj5cXG48YnV0dG9uIGlkPVxcXCJkZWxldGUtaXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInRvb2wtaWNvblxcXCIgc3JjPVxcXCJodHRwczovL2Nkbi1pY29ucy1wbmcuZmxhdGljb24uY29tLzUxMi81NjUvNTY1OTIyLnBuZ1xcXCIgYWx0PVxcXCJEZWxldGUgSXRlbVxcXCI+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuXFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwic2F2ZS1hbm5vdGF0aW9uc1xcXCI+U2F2ZSBBbm5vdGF0aW9uczwvYnV0dG9uPlxcbiAgICAgICAgXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxjYW52YXMgaWQ9XFxcImFubm90YXRpb24tY2FudmFzXFxcIj48L2NhbnZhcz5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuXFxuPHNjcmlwdCBzcmM9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2h0bWwyY2FudmFzLzEuNC4xL2h0bWwyY2FudmFzLm1pbi5qc1xcXCI+PC9zY3JpcHQ+XFxuPHNjcmlwdCBzcmM9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZhYnJpYy5qcy80LjUuMC9mYWJyaWMubWluLmpzXFxcIj48L3NjcmlwdD5cXG48c2NyaXB0PlxcbiAgIFxcbjwvc2NyaXB0PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL2J1Z1RyYWNrZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9idWdUcmFja2VyLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvYnVnVHJhY2tlci5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNidWctcmVwb3J0LXRhYiB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB6LWluZGV4OiAxMDAwO1xcbn1cXG5cXG4jYnVnLXJlcG9ydCB7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcmlnaHQ6IC0zNDVweDtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgd2lkdGg6IDMyMHB4O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLDAsMCwwLjEpO1xcbiAgICB0cmFuc2l0aW9uOiByaWdodCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICB6LWluZGV4OiA5OTk7XFxufVxcblxcbiNidWctcmVwb3J0Lm9wZW4ge1xcbiAgICByaWdodDogMDtcXG59XFxuXFxuI2J1Zy1yZXBvcnQgdGV4dGFyZWEge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuI2J1Zy1yZXBvcnQgaW1nIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNGRjY3Mzc7XFxufVxcblxcbiNzZW5kLXJlcG9ydCwgI2VkaXQtc2NyZWVuc2hvdCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRjY3Mzc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1tb2RhbCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgei1pbmRleDogMTAwMDA7XFxufVxcblxcbiNhbm5vdGF0aW9uLW1vZGFsLm9wZW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1lZGl0b3Ige1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkY2NzM3O1xcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCByZ2JhKDAsMCwwLDAuMSk7XFxuICAgIHdpZHRoOiA4MCU7XFxuICAgIGhlaWdodDogODAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jYW5ub3RhdGlvbi1jYW52YXMge1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRkY2NzM3O1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2xvZ28ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgbWFyZ2luOiAwIGF1dG8gMTBweDtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG59XFxuXFxuLnRvb2wtaWNvbiB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIG1hcmdpbjogNXB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiN0b29scyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICB6LWluZGV4OiAxMDAxO1xcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjRkY2NzM3O1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuI3NhdmUtYW5ub3RhdGlvbnMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY2NzM3O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4jZGVsZXRlLWl0ZW0ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY2NzM3O1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NyYy92aWV3cy9idWdUcmFja2VyLmNzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==