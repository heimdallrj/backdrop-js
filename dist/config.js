"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB = exports.PORT = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 3001;
exports.PORT = PORT;
const DB = {
  connection: 'jsondb',
  jsonPath: _path.default.join(__dirname, '..', 'etc', 'database.json')
};
exports.DB = DB;