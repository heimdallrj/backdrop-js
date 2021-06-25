"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

_fs.default.readdir(_path.default.join(__dirname, '../resources'), (err, resources) => {
  if (err) return;
  resources.forEach(configFp => {
    const config = _fs.default.readFileSync(_path.default.join(__dirname, `../resources/${configFp}`), 'utf-8');

    const {
      name,
      methods
    } = JSON.parse(config); // Resource Types: default, static, proxy

    methods.forEach(methodKey => {
      const method = methodKey.toLowerCase();
      router[method](`/${name}`, (req, res) => res.send(`${method} ${name}`));
    });
  });
});

router.get('/', (req, res) => res.send('hello world'));
var _default = router;
exports.default = _default;