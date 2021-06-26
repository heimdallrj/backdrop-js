"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("../utils/http");

var _jsondb = _interopRequireWildcard(require("../utils/database/jsondb"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', (req, res) => _http.response.success(res)); // resource

router.get('/resource', (req, res) => {
  const resources = _jsondb.db.resources.find({});

  _http.response.success(res, resources);
});
router.get('/resource/:id', (req, res) => {
  const {
    id
  } = req.params;

  const resourceSingle = _jsondb.db.resources.findOneById(id);

  _http.response.success(res, resourceSingle);
});
router.post('/resource', (req, res) => {
  // TODO Validate request body
  // TODO Create a collection
  const doc = req.body;

  const resource = _jsondb.db.resources.insert(doc);

  if (resource && !doc.type === 'proxy') {
    _jsondb.default.createCollection(`_${doc.name}`);
  }

  _http.response.success(res, resource);
});
router.put('/resource/:id', (req, res) => {
  // TODO Validate request body
  const {
    id
  } = req.params;
  const resource = req.body;

  const doc = _jsondb.db.resources.updateOneById(id, resource, true);

  _http.response.success(res, doc);
});
router.patch('/resource/:id', (req, res) => {
  // TODO Validate request body
  const {
    id
  } = req.params;
  const resource = req.body;

  const doc = _jsondb.db.resources.updateOneById(id, resource);

  _http.response.success(res, doc);
});
router.delete('/resource/:id', (req, res) => {
  const {
    id
  } = req.params;

  _http.response.success(res, _jsondb.db.resources.remove(id));
});
var _default = router;
exports.default = _default;