'use strict';

exports.__esModule = true;
exports.default = devServer;

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Use Webpack Dev Server to build and serve assets using Webpack's watch mode,
 * hot reload changes in the browser and display compile error overlays.
 *
 * Static content is handled by CopyPlugin.
 */
function devServer(webpackConfig, serverConfig, url, cb) {
  var compiler = (0, _webpack2.default)(webpackConfig);

  var host = serverConfig.host,
      open = serverConfig.open,
      port = serverConfig.port,
      otherServerConfig = _objectWithoutProperties(serverConfig, ['host', 'open', 'port']);

  var webpackDevServerOptions = (0, _webpackMerge2.default)({
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    overlay: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }, otherServerConfig);

  (0, _debug2.default)('webpack dev server options: %s', (0, _utils.deepToString)(webpackDevServerOptions));

  var server = new _webpackDevServer2.default(compiler, webpackDevServerOptions);
  server.listen(port, host, function (err) {
    if (err) return cb(err);
    if (open) {
      // --open
      if ((0, _utils.typeOf)(open) === 'boolean') (0, _opn2.default)(url);
      // --open=firefox
      else (0, _opn2.default)(url, { app: open });
    }
  });
}
module.exports = exports['default'];