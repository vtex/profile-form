'use strict';

exports.__esModule = true;
exports.default = webpackServer;

var _chalk = require('chalk');

var _detectPort = require('detect-port');

var _detectPort2 = _interopRequireDefault(_detectPort);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _config = require('./config');

var _constants = require('./constants');

var _createServerWebpackConfig = require('./createServerWebpackConfig');

var _createServerWebpackConfig2 = _interopRequireDefault(_createServerWebpackConfig);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _devServer = require('./devServer');

var _devServer2 = _interopRequireDefault(_devServer);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the port to run the server on, detecting if the intended port is
 * available first and prompting the user if not.
 */
function getServerPort(args, intendedPort, cb) {
  (0, _detectPort2.default)(intendedPort, function (err, suggestedPort) {
    if (err) return cb(err);
    // No need to prompt if the intended port is available
    if (suggestedPort === intendedPort) return cb(null, suggestedPort);
    // Support use of --force to avoid interactive prompt
    if (args.force) return cb(null, suggestedPort);

    if (args.clear !== false && args.clearConsole !== false) {
      (0, _utils.clearConsole)();
    }
    console.log((0, _chalk.yellow)(`Something is already running on port ${intendedPort}.`));
    console.log();
    _inquirer2.default.prompt([{
      type: 'confirm',
      name: 'run',
      message: 'Would you like to run the app on another port instead?',
      default: true
    }]).then(function (_ref) {
      var run = _ref.run;
      return cb(null, run ? suggestedPort : null);
    }, function (err) {
      return cb(err);
    });
  });
}

/**
 * Start a development server with Webpack using a given build configuration.
 */
function webpackServer(args, buildConfig, cb) {
  // Default environment to development - we also run the dev server while
  // testing to check that HMR works.
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }

  if (typeof buildConfig == 'function') {
    buildConfig = buildConfig(args);
  }

  var serverConfig = void 0;
  try {
    var pluginConfig = (0, _config.getPluginConfig)(args);
    serverConfig = (0, _config.getUserConfig)(args, { pluginConfig }).devServer;
  } catch (e) {
    return cb(e);
  }

  getServerPort(args, args.port || Number(serverConfig.port) || _constants.DEFAULT_PORT, function (err, port) {
    if (err) return cb(err);
    // A null port indicates the user chose not to run the server when prompted
    if (port === null) return cb();

    serverConfig.port = port;
    // Fallback index serving can be disabled with --no-fallback
    if (args.fallback === false) serverConfig.historyApiFallback = false;
    // The host can be overridden with --host
    if (args.host) serverConfig.host = args.host;
    // Open a browser with --open (default browser) or --open="browser name"
    if (args.open) serverConfig.open = args.open;

    var url = `http${serverConfig.https ? 's' : ''}://${args.host || 'localhost'}:${port}/`;

    if (!('status' in buildConfig.plugins)) {
      buildConfig.plugins.status = {
        disableClearConsole: args.clear === false || args['clear-console'] === false,
        successMessage: `The app is running at ${url}`
      };
    }

    var webpackConfig = void 0;
    try {
      webpackConfig = (0, _createServerWebpackConfig2.default)(args, buildConfig, serverConfig);
    } catch (e) {
      return cb(e);
    }

    (0, _debug2.default)('webpack config: %s', (0, _utils.deepToString)(webpackConfig));

    (0, _devServer2.default)(webpackConfig, serverConfig, url, cb);
  });
}
module.exports = exports['default'];