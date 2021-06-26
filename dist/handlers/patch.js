"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = patch;

var _http = require("../utils/http");

function patch(req, res) {
  return _http.response.success(res);
}