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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectItem = selectItem;
exports.getListItem = getListItem;
exports.addItem = addItem;
var ITEM_CLICKED = exports.ITEM_CLICKED = 'ITEM_CLICKED';
var ITEM_VIEW = exports.ITEM_VIEW = 'ITEM_VIEW';
var ADD_ITEM = exports.ADD_ITEM = 'ADD_ITEM';

function selectItem(listItem) {
    return {
        type: ITEM_CLICKED,
        payload: listItem
    };
}

function getListItem(id) {
    return {
        type: ITEM_VIEW,
        payload: id
    };
}

function addItem(item) {
    return {
        type: ADD_ITEM,
        payload: item
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(20);

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(2);

var _routes = __webpack_require__(18);

var _routes2 = _interopRequireDefault(_routes);

var _index = __webpack_require__(16);

var _index2 = _interopRequireDefault(_index);

var _redux = __webpack_require__(5);

var _reactRedux = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { ADD_ITEM } from '../views/src/actions/list_actions';

var router = _express2.default.Router();

router.get('/', function (req, res) {
	/*
 Here we are first matching if the current url exists in the react router routes
  */
	(0, _reactRouter.match)({ routes: _routes2.default, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {

			/*
          http://redux.js.org/docs/recipes/ServerRendering.html
    */
			var store = (0, _redux.createStore)(_index2.default);

			var html = _server2.default.renderToString(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_reactRouter.RouterContext, renderProps)
			));

			/*
   We can dispatch actions from server side as well. This can be very useful if you want
   to inject some initial data into the app. For example, if you have some articles that
   you have fetched from database and you want to load immediately after the user has loaded
   the webpage, you can do so in here.
   	Here we are inject an list item into our app. Normally once the user has loaded the webpage
   we would make a request to the server and get the latest item list. But in the server we have
   instant connection to a database (for example, if you have a mongoDB or MySQL database installed
   in the server which contains all you items). So you can quickly fetch and inject it into the webpage.
   	This will help SEO as well. If you load the webpage and make a request to the server to get all the
   latest items/articles, by the time Google Search Engine may not see all the updated items/articles.
   	But if you inject the latest items/articles before it reaches the user, the Search Engine will see the
   item/article immediately.
    */
			store.dispatch({
				type: 'stefan_test',
				payload: {
					name: 'Components',
					description: 'Description for components'
				}
			});

			var finalState = store.getState();

			res.status(200).send(renderFullPage(html, finalState));
		} else {
			res.status(404).send('Not found');
		}
	});
});

/*
In this function, you can render you html part of the webpage. You can add some meta tags or Opern Graph tags
using JS variables.
 */
function renderFullPage(html, initialState) {
	return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n    \t<!-- Required meta tags always come first -->\n    \t<meta charset="utf-8">\n    \t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    \t<meta http-equiv="x-ua-compatible" content="ie=edge">\n    \t<title>React Router Redux Express</title>\n\n    \t<!-- Bootstrap CSS -->\n    \t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">\n    \t<link rel="stylesheet" href="../stylesheets/main.css">\n    </head>\n    <body>\n\n    \t<div id="reactbody"><div>' + html + '</div></div>\n        <script>\n            window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + '\n          </script>\n    \t<script src="../bin/app.bundle.js"></script>\n    \t<!-- jQuery first, then Bootstrap JS. -->\n    \t<script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script>\n    \t<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>\n    \t<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>\n    </body>\n    </html>\n    ';
}

exports.default = router;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compress = __webpack_require__(7);
var http = __webpack_require__(9);
var proxy = __webpack_require__(8);
var url = __webpack_require__(10);

var app = (0, _express2.default)();
app.use(compress());

app.use('/bin', _express2.default.static('./bin'));
app.use('/stylesheets', _express2.default.static('./public/stylesheets'));

app.use('/', _index2.default);

app.use('/lazadaproxy/*', function (req, response, next) {
	var temp = req.originalUrl;
	temp = temp.replace('/lazadaproxy/', '');
	var urlObj = url.parse(temp);
	var options = {
		host: urlObj.host,
		path: urlObj.pathname
	};
	http.get(options, function (res) {
		var str = '';
		res.on('data', function (chunk) {
			str += chunk;
		});
		res.on('end', function () {
			console.log('done');
			response.json(str);
		});
	}).on('error', function (e) {});
}, proxy({
	//  	target: 'http://www.lazada.sg',
	changeOrigin: true,
	logLevel: 'debug',
	router: function router(req) {
		var temp = req.originalUrl;
		temp = temp.replace('/lazadaproxy/', '');
		var urlObj = url.parse(temp);
		var options = {
			host: urlObj.host,
			path: urlObj.pathname
		};
		return urlObj.protocol + '//' + urlObj.host;
	}
}));

app.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
    _inherits(Header, _Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { marginTop: 20 } },
                _react2.default.createElement(
                    'h1',
                    null,
                    'truongthanhtungitvn@gmail.com'
                ),
                this.props.children
            );
        }
    }]);

    return Header;
}(_react.Component);

exports.default = Header;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactLoading = __webpack_require__(21);

var _reactLoading2 = _interopRequireDefault(_reactLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
	return _react2.default.createElement(_reactLoading2.default, { color: '#ababab' });
};
exports.default = Loading;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _loading = __webpack_require__(13);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import sweetalert2 from 'sweetalert2'
var htmlparser = __webpack_require__(19);
var validUrl = __webpack_require__(23);
var spec = [];

var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.state = {
            url1: 'http://www.lazada.sg/apple-iphone-7-plus-128gb-jet-black-8629928.html',
            url2: 'http://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html',
            handling: 0
        };
        _this.handleChange1 = _this.handleChange1.bind(_this);
        _this.handleChange2 = _this.handleChange2.bind(_this);
        _this.mappingData = _this.mappingData.bind(_this);
        _this.fetchData = _this.fetchData.bind(_this);
        return _this;
    }

    _createClass(Main, [{
        key: 'handleChange1',
        value: function handleChange1(event) {
            var u = event.target.value;
            this.setState({ url1: u });
        }
    }, {
        key: 'handleChange2',
        value: function handleChange2(event) {
            var u = event.target.value;
            this.setState({ url2: u });
        }
    }, {
        key: 'mappingData',
        value: function mappingData() {
            var a1 = [];
            var a2 = [];
            var data1 = [];
            var data2 = [];
            var fulldata = [];

            var urlObj = this.state.url1;
            var urlObj2 = this.state.url2;

            var url1 = '/lazadaproxy/' + urlObj;
            var url2 = '/lazadaproxy/' + urlObj2;

            var urls = [url1, url2];
            for (var i = 0; i < spec.length; i++) {
                if (spec[i].url == url1) {
                    a1.push(spec[i].data);
                }

                if (spec[i].url == url2) {
                    a2.push(spec[i].data);
                }
            }

            if (a1.length < a2.length) {
                data1 = a2;
                data2 = a1;
            } else {
                data1 = a1;
                data2 = a2;
            }
            for (var i = 0; i < data1.length; i++) {
                var item = data1[i];
                var isMatch = false;
                for (var j = 0; j < data2.length; j++) {
                    var item2 = data2[j];
                    if (item[0].innerText && item[0].innerText == item2[0].innerText) {
                        isMatch = true;
                        fulldata.push({
                            name: item[0].innerText,
                            p1: item[1].innerText,
                            p2: item2[1].innerText
                        });
                        break;
                    }
                }
                if (!isMatch) {
                    fulldata.push({
                        name: item[0].innerText,
                        p1: item[1].innerText,
                        p2: ''
                    });
                }
            }
            return fulldata;
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var urlObj = this.state.url1;
            var urlObj2 = this.state.url2;

            if (!validUrl.isUri(urlObj) || !validUrl.isUri(urlObj2)) {
                alert('Please input url');
                return;
            }

            if (this.state.handling == 2) {
                return;
            }
            var that = this;
            this.setState({
                handling: 1
            });

            var url1 = '/lazadaproxy/' + urlObj;
            var url2 = '/lazadaproxy/' + urlObj2;
            var urls = [url1, url2];

            Promise.all(urls.map(function (url) {
                return fetch(url).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    var el = document.createElement('html');
                    el.innerHTML = data;
                    var table = el.getElementsByClassName('specification-table');
                    var tableRows = table[0].rows; // Node/Element interface
                    for (var i = 0; i < tableRows.length; i++) {
                        var rowItem = tableRows[i];
                        var cells = tableRows[i].cells;
                        spec.push({
                            url: url,
                            data: cells
                        });
                    }
                });
            })).then(function (texts) {
                that.setState({
                    handling: 2
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var specContent = null;
            if (this.state.handling == 1) {
                specContent = _react2.default.createElement(
                    'div',
                    { className: 'col-md-12 col-md-offset-5' },
                    _react2.default.createElement(_loading2.default, null)
                );
            } else if (this.state.handling == 2) {
                var fulldata = this.mappingData();
                //add content spec here
                specContent = _react2.default.createElement(
                    'table',
                    { className: 'table' },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        fulldata.map(function (item, idx) {
                            return _react2.default.createElement(
                                'tr',
                                { key: idx },
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    item.name
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    item.p1
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    item.p2
                                )
                            );
                        })
                    )
                );
            }

            var buttonContent = _react2.default.createElement(
                'div',
                { className: 'col-md-12' },
                _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'btn btn-primary btn-md',
                        onClick: this.fetchData
                    },
                    'Fetch Data Now'
                )
            );
            return _react2.default.createElement(
                'div',
                { className: 'col-md-10 col-md-offset-1 main' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-12' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', {
                            type: 'text',
                            className: 'form-control',
                            id: 'url1',
                            placeholder: 'Enter an url here',
                            value: this.state.url1,
                            onChange: this.handleChange1
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', {
                            type: 'text',
                            className: 'form-control',
                            id: 'url2',
                            placeholder: 'Enter an url here',
                            value: this.state.url2,
                            onChange: this.handleChange2
                        })
                    )
                ),
                buttonContent,
                specContent
            );
        }
    }]);

    return Main;
}(_react.Component);

exports.default = Main;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(5);

var _lists = __webpack_require__(17);

var _lists2 = _interopRequireDefault(_lists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    lists: _lists2.default
});

exports.default = rootReducer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case _list_actions.ITEM_CLICKED:
            return _extends({}, state, { item: action.payload });
        case _list_actions.ADD_ITEM:
            return _extends({}, state, { all: [].concat(_toConsumableArray(state.all), [action.payload]) });
        case _list_actions.ITEM_VIEW:
            switch (action.payload) {
                case 'Actions':
                    return _extends({}, state, { item: ListItems[0] });
                case 'Containers':
                    return _extends({}, state, { item: ListItems[1] });
                case 'Reducers':
                    return _extends({}, state, { item: ListItems[2] });
            }
    }
    return state;
};

var _list_actions = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ListItems = [{ name: 'Actions', description: 'Description for actions' }, { name: 'Containers', description: 'Description for containers' }, { name: 'Reducers', description: 'Description for reducer' }];

var INITIAL_STATE = { all: ListItems, item: null };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(2);

var _header = __webpack_require__(12);

var _header2 = _interopRequireDefault(_header);

var _main = __webpack_require__(14);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _header2.default },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _main2.default })
    )
);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("htmlparser2");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-loading");

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

module.exports = require("valid-url");

/***/ })
/******/ ]);