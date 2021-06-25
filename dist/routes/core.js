"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', (req, res) => res.send('hello world')); // resource

router.get('/resource', (req, res) => res.send('get resource'));
router.post('/resource', (req, res) => res.send('post resource'));
router.put('/resource', (req, res) => res.send('put resource'));
router.delete('/resource', (req, res) => res.send('delete resource'));
var _default = router;
exports.default = _default;