"use strict";
(self["webpackChunkprojet_twitter"] = self["webpackChunkprojet_twitter"] || []).push([["app"],{

/***/ "./assets/react/TweetList.jsx":
/*!************************************!*\
  !*** ./assets/react/TweetList.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.create.js */ "./node_modules/core-js/modules/es.object.create.js");
/* harmony import */ var core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of.js */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of.js */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_21__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }





















function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

function TweetList() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_21__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    tweets = _useState2[0],
    setTweets = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_21__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_21__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_21__.useEffect)(function () {
    var fetchTweets = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return fetch('/tweet');
            case 1:
              response = _context.v;
              if (response.ok) {
                _context.n = 2;
                break;
              }
              throw new Error("HTTP error! status: ".concat(response.status));
            case 2:
              _context.n = 3;
              return response.json();
            case 3:
              data = _context.v;
              console.log('Tweets received:', data); // Pour le débogage
              setTweets(data);
              setLoading(false);
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error('Erreur lors du chargement des tweets:', _t);
              setError(_t.message);
              setLoading(false);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[0, 4]]);
      }));
      return function fetchTweets() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchTweets();
  }, []);
  if (loading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("div", null, "Chargement des tweets...");
  if (error) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("div", null, "Erreur: ", error);
  if (!tweets.length) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("div", null, "Aucun tweet trouv\xE9");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("div", {
    className: "tweets-container"
  }, tweets.map(function (tweet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("div", {
      key: tweet.id,
      className: "tweet"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("h3", null, tweet.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("p", null, tweet.content), tweet.picture && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("img", {
      src: tweet.picture,
      alt: "Tweet image"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_21___default().createElement("small", null, "Par ", tweet.author.username, " le ", tweet.createdAt));
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TweetList);

/***/ }),

/***/ "./assets/react/app.jsx":
/*!******************************!*\
  !*** ./assets/react/app.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _TweetList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TweetList */ "./assets/react/TweetList.jsx");



document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('root');
  if (container) {
    var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
    root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_TweetList__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
  } else {
    console.error("Couldn't find root element");
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_react-dom_client_js-node_modules_core-js_modules_es_array_from_js-node_m-5d375f"], () => (__webpack_exec__("./assets/react/app.jsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cHJvamV0X3R3aXR0ZXIvLi9hc3NldHMvcmVhY3QvVHdlZXRMaXN0LmpzeCIsIndlYnBhY2s6Ly9wcm9qZXRfdHdpdHRlci8uL2Fzc2V0cy9yZWFjdC9hcHAuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZnVuY3Rpb24gVHdlZXRMaXN0KCkge1xyXG4gICAgY29uc3QgW3R3ZWV0cywgc2V0VHdlZXRzXSA9IHVzZVN0YXRlKFtdKTtcclxuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZldGNoVHdlZXRzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL3R3ZWV0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUd2VldHMgcmVjZWl2ZWQ6JywgZGF0YSk7IC8vIFBvdXIgbGUgZMOpYm9nYWdlXHJcbiAgICAgICAgICAgICAgICBzZXRUd2VldHMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGVzIHR3ZWV0czonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBzZXRFcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZmV0Y2hUd2VldHMoKTtcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBpZiAobG9hZGluZykgcmV0dXJuIDxkaXY+Q2hhcmdlbWVudCBkZXMgdHdlZXRzLi4uPC9kaXY+O1xyXG4gICAgaWYgKGVycm9yKSByZXR1cm4gPGRpdj5FcnJldXI6IHtlcnJvcn08L2Rpdj47XHJcbiAgICBpZiAoIXR3ZWV0cy5sZW5ndGgpIHJldHVybiA8ZGl2PkF1Y3VuIHR3ZWV0IHRyb3V2w6k8L2Rpdj47XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR3ZWV0cy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAge3R3ZWV0cy5tYXAodHdlZXQgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3R3ZWV0LmlkfSBjbGFzc05hbWU9XCJ0d2VldFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMz57dHdlZXQudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cD57dHdlZXQuY29udGVudH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAge3R3ZWV0LnBpY3R1cmUgJiYgPGltZyBzcmM9e3R3ZWV0LnBpY3R1cmV9IGFsdD1cIlR3ZWV0IGltYWdlXCIgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsPlBhciB7dHdlZXQuYXV0aG9yLnVzZXJuYW1lfSBsZSB7dHdlZXQuY3JlYXRlZEF0fTwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUd2VldExpc3Q7ICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50JztcclxuaW1wb3J0IFR3ZWV0TGlzdCBmcm9tICcuL1R3ZWV0TGlzdCc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgICBjb25zdCByb290ID0gY3JlYXRlUm9vdChjb250YWluZXIpO1xyXG4gICAgICAgIHJvb3QucmVuZGVyKFxyXG4gICAgICAgICAgICA8UmVhY3QuU3RyaWN0TW9kZT5cclxuICAgICAgICAgICAgICAgIDxUd2VldExpc3QgLz5cclxuICAgICAgICAgICAgPC9SZWFjdC5TdHJpY3RNb2RlPlxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBmaW5kIHJvb3QgZWxlbWVudFwiKTtcclxuICAgIH1cclxufSk7ICJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX2ludm9rZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiVHdlZXRMaXN0IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsInR3ZWV0cyIsInNldFR3ZWV0cyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImVycm9yIiwic2V0RXJyb3IiLCJmZXRjaFR3ZWV0cyIsIl9yZWYiLCJfY2FsbGVlIiwicmVzcG9uc2UiLCJkYXRhIiwiX3QiLCJfY29udGV4dCIsImZldGNoIiwib2siLCJFcnJvciIsImNvbmNhdCIsInN0YXR1cyIsImpzb24iLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJtYXAiLCJ0d2VldCIsImtleSIsImlkIiwidGl0bGUiLCJjb250ZW50IiwicGljdHVyZSIsInNyYyIsImFsdCIsImF1dGhvciIsInVzZXJuYW1lIiwiY3JlYXRlZEF0IiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwicm9vdCIsInJlbmRlciIsIlN0cmljdE1vZGUiXSwic291cmNlUm9vdCI6IiJ9