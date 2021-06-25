"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _hpp = _interopRequireDefault(require("hpp"));

var _logger = _interopRequireDefault(require("./utils/logger"));

var _api = _interopRequireDefault(require("./routes/api"));

var _core = _interopRequireDefault(require("./routes/core"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _xssClean.default)());
const limiter = (0, _expressRateLimit.default)({
  windowMs: 10 * 60 * 1000,
  // 10 minutes
  max: 100 // 100 requests per IP

});
app.use(limiter);
app.use((0, _expressMongoSanitize.default)());
app.use((0, _hpp.default)());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _morgan.default)('dev'));

const serve = async () => {
  app.use('/api', _api.default);
  app.use('/core', _core.default);
  app.use(_express.default.static(_path.default.join(_path.default.join(__dirname, '..', 'public'))));
  app.get('/*', (req, res) => {
    res.sendFile(_path.default.join(__dirname, '..', 'public', 'index.html'));
  });
  app.listen(_config.PORT, () => {
    _logger.default.log(`Server is running on ${_config.PORT}`);
  });
};

serve();