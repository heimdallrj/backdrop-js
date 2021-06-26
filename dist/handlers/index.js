"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.default;
  }
});
Object.defineProperty(exports, "post", {
  enumerable: true,
  get: function () {
    return _post.default;
  }
});
Object.defineProperty(exports, "put", {
  enumerable: true,
  get: function () {
    return _put.default;
  }
});
Object.defineProperty(exports, "patch", {
  enumerable: true,
  get: function () {
    return _patch.default;
  }
});
Object.defineProperty(exports, "delete", {
  enumerable: true,
  get: function () {
    return _delete.default;
  }
});

var _get = _interopRequireDefault(require("./get"));

var _post = _interopRequireDefault(require("./post"));

var _put = _interopRequireDefault(require("./put"));

var _patch = _interopRequireDefault(require("./patch"));

var _delete = _interopRequireDefault(require("./delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }