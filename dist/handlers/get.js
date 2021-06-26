"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _http = require("../utils/http");

var _jsondb = require("../utils/database/jsondb");

function get(req, res, {
  name
}) {
  const docs = _jsondb.db[name].find();

  return _http.response.success(res, docs);
}