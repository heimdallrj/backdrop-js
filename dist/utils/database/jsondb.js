"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.db = void 0;

var _nodeJsondb = _interopRequireDefault(require("../../libs/node-jsondb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jsonDb = new _nodeJsondb.default();
const db = jsonDb.collections;
exports.db = db;
var _default = jsonDb;
exports.default = _default;