'use strict';

exports.__esModule = true;
exports.getUserConfig = getUserConfig;
exports.getProjectType = getProjectType;
exports.processUserConfig = processUserConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _webpack2 = require('webpack');

var _webpack3 = _interopRequireDefault(_webpack2);

var _constants = require('../constants');

var _debug = require('../debug');

var _debug2 = _interopRequireDefault(_debug);

var _errors = require('../errors');

var _utils = require('../utils');

var _babel = require('./babel');

var _karma = require('./karma');

var _npm = require('./npm');

var _UserConfigReport = require('./UserConfigReport');

var _UserConfigReport2 = _interopRequireDefault(_UserConfigReport);

var _webpack4 = require('./webpack');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_REQUIRED = false;

/**
 * Load a user config file and process it.
 */
function getUserConfig() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$check = options.check,
      check = _options$check === undefined ? false : _options$check,
      _options$pluginConfig = options.pluginConfig,
      pluginConfig = _options$pluginConfig === undefined ? {} : _options$pluginConfig,
      _options$required = options.required,
      required = _options$required === undefined ? DEFAULT_REQUIRED : _options$required;

  // Try to load default user config, or use a config file path we were given

  var userConfig = {};
  var configPath = _path2.default.resolve(args.config || _constants.CONFIG_FILE_NAME);

  // Bail early if a config file is required by the current command, or if the
  // user specified a custom location, and it doesn't exist.
  var configFileExists = _fs2.default.existsSync(configPath);
  if ((args.config || required) && !configFileExists) {
    throw new Error(`Couldn't find a config file at ${configPath}`);
  }

  // If a config file exists, it should be a valid module regardless of whether
  // or not it's required.
  if (configFileExists) {
    try {
      userConfig = require(configPath);
      (0, _debug2.default)('imported config module from %s', configPath);
      // Delete the config file from the require cache as some builds need to
      // import it multiple times with a different NODE_ENV in place.
      delete require.cache[configPath];
    } catch (e) {
      throw new Error(`Couldn't import the config file at ${configPath}: ${e.message}\n${e.stack}`);
    }
  }

  userConfig = processUserConfig({
    args,
    check,
    configFileExists,
    configPath,
    pluginConfig,
    required,
    userConfig
  });

  if (configFileExists) {
    userConfig.path = configPath;
  }

  return userConfig;
}

/**
 * Load a user config file to get its project type. If we need to check the
 * project type, a config file must exist.
 */
function getProjectType() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Try to load default user config, or use a config file path we were given
  var userConfig = {};
  var configPath = _path2.default.resolve(args.config || _constants.CONFIG_FILE_NAME);

  // Bail early if a config file doesn't exist
  var configFileExists = _fs2.default.existsSync(configPath);
  if (!configFileExists) {
    throw new Error(`Couldn't find a config file at ${configPath} to determine project type.`);
  }

  try {
    userConfig = require(configPath);
    // Delete the file from the require cache as it may be imported multiple
    // times with a different NODE_ENV in place depending on the command.
    delete require.cache[configPath];
  } catch (e) {
    throw new Error(`Couldn't import the config file at ${configPath}: ${e.message}\n${e.stack}`);
  }

  // Config modules can export a function if they need to access the current
  // command or the webpack dependency nwb manages for them.
  if ((0, _utils.typeOf)(userConfig) === 'function') {
    userConfig = userConfig({
      args,
      command: args._[0],
      webpack: _webpack3.default
    });
  }

  var report = new _UserConfigReport2.default({ configFileExists, configPath });

  if (!_constants.PROJECT_TYPES.has(userConfig.type)) {
    report.error('type', userConfig.type, `Must be one of: ${(0, _utils.joinAnd)(Array.from(_constants.PROJECT_TYPES), 'or')}`);
  }
  if (report.hasErrors()) {
    throw new _errors.ConfigValidationError(report);
  }

  return userConfig.type;
}

/**
 * Validate user config and perform any supported transformations to it.
 */
function processUserConfig(_ref) {
  var _ref$args = _ref.args,
      args = _ref$args === undefined ? {} : _ref$args,
      _ref$check = _ref.check,
      check = _ref$check === undefined ? false : _ref$check,
      configFileExists = _ref.configFileExists,
      configPath = _ref.configPath,
      _ref$pluginConfig = _ref.pluginConfig,
      pluginConfig = _ref$pluginConfig === undefined ? {} : _ref$pluginConfig,
      _ref$required = _ref.required,
      required = _ref$required === undefined ? DEFAULT_REQUIRED : _ref$required,
      userConfig = _ref.userConfig;

  // Config modules can export a function if they need to access the current
  // command or the webpack dependency nwb manages for them.
  if ((0, _utils.typeOf)(userConfig) === 'function') {
    userConfig = userConfig({
      args,
      command: args._[0],
      webpack: _webpack3.default
    });
  }

  var report = new _UserConfigReport2.default({ configFileExists, configPath });

  var _userConfig = userConfig,
      type = _userConfig.type,
      polyfill = _userConfig.polyfill,
      babel = _userConfig.babel,
      devServer = _userConfig.devServer,
      karma = _userConfig.karma,
      npm = _userConfig.npm,
      _webpack = _userConfig.webpack,
      unexpectedConfig = _objectWithoutProperties(_userConfig, ['type', 'polyfill', 'babel', 'devServer', 'karma', 'npm', 'webpack']);

  var unexpectedProps = Object.keys(unexpectedConfig);
  if (unexpectedProps.length > 0) {
    report.error('nwb config', unexpectedProps.join(', '), `Unexpected top-level prop${(0, _utils.pluralise)(unexpectedProps.length)} in nwb config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md for supported config');
  }

  if ((required || 'type' in userConfig) && !_constants.PROJECT_TYPES.has(type)) {
    report.error('type', userConfig.type, `Must be one of: ${(0, _utils.joinAnd)(Array.from(_constants.PROJECT_TYPES), 'or')}`);
  }

  if ('polyfill' in userConfig && (0, _utils.typeOf)(polyfill) !== 'boolean') {
    report.error('polyfill', `type: ${(0, _utils.typeOf)(polyfill)}`, `Must be ${_chalk2.default.cyan('Boolean')}`);
  }

  var argumentOverrides = {};
  void ['babel', 'devServer', 'karma', 'npm', 'webpack'].forEach(function (prop) {
    // Set defaults for top-level config objects so we don't have to
    // existence-check them everywhere.
    if (!(prop in userConfig)) {
      userConfig[prop] = {};
    } else if ((0, _utils.typeOf)(userConfig[prop]) !== 'object') {
      report.error(prop, `type: ${(0, _utils.typeOf)(userConfig[prop])}`, `${_chalk2.default.cyan(prop)} config must be an ${_chalk2.default.cyan('Object')} `);
      // Set a valid default so further checks can continue
      userConfig[prop] = {};
    }
    // Allow config overrides via --path.to.config in args
    if ((0, _utils.typeOf)(args[prop]) === 'object') {
      argumentOverrides[prop] = args[prop];
    }
  });

  if (Object.keys(argumentOverrides).length > 0) {
    (0, _debug2.default)('user config arguments: %s', (0, _utils.deepToString)(argumentOverrides));
    userConfig = (0, _utils.replaceArrayMerge)(userConfig, argumentOverrides);
    report.hasArgumentOverrides = true;
  }

  (0, _babel.processBabelConfig)({ report, userConfig });
  (0, _karma.processKarmaConfig)({ report, userConfig });
  (0, _npm.processNpmBuildConfig)({ report, userConfig });
  (0, _webpack4.processWebpackConfig)({ pluginConfig, report, userConfig });

  if (report.hasErrors()) {
    throw new _errors.ConfigValidationError(report);
  }
  if (check) {
    throw report;
  }
  if (report.hasSomethingToReport()) {
    report.log();
  }

  (0, _debug2.default)('user config: %s', (0, _utils.deepToString)(userConfig));

  return userConfig;
}