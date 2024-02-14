'use strict';

exports.__esModule = true;
exports.processBabelConfig = processBabelConfig;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BABEL_RUNTIME_OPTIONS = new Set(['helpers', 'polyfill']);

function processBabelConfig(_ref) {
  var report = _ref.report,
      userConfig = _ref.userConfig;

  var _userConfig$babel = userConfig.babel,
      cherryPick = _userConfig$babel.cherryPick,
      env = _userConfig$babel.env,
      loose = _userConfig$babel.loose,
      plugins = _userConfig$babel.plugins,
      presets = _userConfig$babel.presets,
      removePropTypes = _userConfig$babel.removePropTypes,
      reactConstantElements = _userConfig$babel.reactConstantElements,
      runtime = _userConfig$babel.runtime,
      stage = _userConfig$babel.stage,
      config = _userConfig$babel.config,
      unexpectedConfig = _objectWithoutProperties(_userConfig$babel, ['cherryPick', 'env', 'loose', 'plugins', 'presets', 'removePropTypes', 'reactConstantElements', 'runtime', 'stage', 'config']);

  var unexpectedProps = Object.keys(unexpectedConfig);
  if (unexpectedProps.length > 0) {
    report.error('babel', unexpectedProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(unexpectedProps.length)} in ${_chalk2.default.cyan('babel')} config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#babel-configuration for supported config');
  }

  // cherryPick
  if ('cherryPick' in userConfig.babel) {
    if ((0, _utils.typeOf)(cherryPick) !== 'string' && (0, _utils.typeOf)(cherryPick) !== 'array') {
      report.error('babel.cherryPick', cherryPick, `Must be a ${_chalk2.default.cyan('String')} or an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // env
  if ('env' in userConfig.babel) {
    if ((0, _utils.typeOf)(env) !== 'object') {
      report.error('babel.env', env, `Must be an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // loose
  if ('loose' in userConfig.babel) {
    if ((0, _utils.typeOf)(loose) !== 'boolean') {
      report.error('babel.loose', loose, `Must be ${_chalk2.default.cyan('Boolean')}`);
    }
  }

  // plugins
  if ('plugins' in userConfig.babel) {
    if ((0, _utils.typeOf)(plugins) === 'string') {
      userConfig.babel.plugins = [plugins];
    } else if ((0, _utils.typeOf)(userConfig.babel.plugins) !== 'array') {
      report.error('babel.plugins', plugins, `Must be a ${_chalk2.default.cyan('String')} or an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // presets
  if ('presets' in userConfig.babel) {
    if ((0, _utils.typeOf)(presets) === 'string') {
      userConfig.babel.presets = [presets];
    } else if ((0, _utils.typeOf)(presets) !== 'array') {
      report.error('babel.presets', presets, `Must be a ${_chalk2.default.cyan('String')} or an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // removePropTypes
  if ('removePropTypes' in userConfig.babel) {
    if (removePropTypes !== false && (0, _utils.typeOf)(removePropTypes) !== 'object') {
      report.error(`babel.removePropTypes`, removePropTypes, `Must be ${_chalk2.default.cyan('false')} (to disable removal of PropTypes) ` + `or an ${_chalk2.default.cyan('Object')} (to configure react-remove-prop-types)`);
    }
  }

  // reactConstantElements
  if ('reactConstantElements' in userConfig.babel) {
    if ((0, _utils.typeOf)(reactConstantElements) !== 'boolean') {
      report.error('babel.reactConstantElements', reactConstantElements, `Must be ${_chalk2.default.cyan('Boolean')}`);
    }
  }

  // runtime
  if ('runtime' in userConfig.babel && (0, _utils.typeOf)(runtime) !== 'boolean' && !BABEL_RUNTIME_OPTIONS.has(runtime)) {
    report.error('babel.runtime', runtime, `Must be ${_chalk2.default.cyan('Boolean')}, ${_chalk2.default.cyan("'helpers'")} or ${_chalk2.default.cyan("'polyfill'")}`);
  }

  // stage
  if ('stage' in userConfig.babel) {
    if ((0, _utils.typeOf)(stage) === 'number') {
      if (stage < 0 || stage > 3) {
        report.error('babel.stage', stage, `Must be between ${_chalk2.default.cyan(0)} and ${_chalk2.default.cyan(3)}`);
      }
    } else if (stage !== false) {
      report.error('babel.stage', stage, `Must be a ${_chalk2.default.cyan('Number')} between ${_chalk2.default.cyan('0')} and ${_chalk2.default.cyan('3')} (to choose a stage preset), ` + `or ${_chalk2.default.cyan('false')} (to disable use of a stage preset)`);
    }
  }

  // config
  if ('config' in userConfig.babel && (0, _utils.typeOf)(config) !== 'function') {
    report.error(`babel.config`, `type: ${(0, _utils.typeOf)(config)}`, `Must be a ${_chalk2.default.cyan('Function')}`);
  }
}