"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxy = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _http = require("./http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const proxy = ({
  endpoint
}, req, res) => {
  (0, _nodeFetch.default)(endpoint).then(resp => resp.json()).then(data => _http.response.success(res, data));
};

exports.proxy = proxy;