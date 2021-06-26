"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _handler = require("../utils/handler");

var _http = require("../utils/http");

var _jsondb = require("../utils/database/jsondb");

var handlers = _interopRequireWildcard(require("../handlers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const resources = _jsondb.db.resources.find();

resources.forEach(resource => {
  const {
    name,
    type,
    methods,
    status,
    ...restConfig
  } = resource;
  const resourceRoute = `/${name}`;

  let handler = () => {};

  if (status === 'published') {
    if (!type || type === 'default') {
      methods.forEach(m => {
        const method = m.toLowerCase();

        if (method === 'get') {
          router.get(resourceRoute, handlers.get.bind(void 0, resource));
          router.get(`${resourceRoute}/:id`, handlers.getById.bind(void 0, resource));
        }

        if (method === 'post') {
          router.post(resourceRoute, handlers.post.bind(void 0, resource));
        }

        if (method === 'put') {
          router.put(`${resourceRoute}/:id`, handlers.put.bind(void 0, resource));
        }

        if (method === 'patch') {
          router.patch(`${resourceRoute}/:id`, handlers.patch.bind(void 0, resource));
        }

        if (method === 'delete') {
          router.delete(`${resourceRoute}/:id`, handlers.delete.bind(void 0, resource));
        }
      });
    }

    if (type === 'proxy') {
      handler = _handler.proxy.bind(null, restConfig);
      router.get(resourceRoute, handler);
    }

    if (type === 'static') {// TODO
    }
  }
});
router.get('/', (req, res) => _http.response.success(res));
var _default = router;
exports.default = _default;