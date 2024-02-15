'use strict';

exports.__esModule = true;
exports.processNpmBuildConfig = processNpmBuildConfig;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function processNpmBuildConfig(_ref) {
  var report = _ref.report,
      userConfig = _ref.userConfig;

  var _userConfig$npm = userConfig.npm,
      cjs = _userConfig$npm.cjs,
      esModules = _userConfig$npm.esModules,
      umd = _userConfig$npm.umd,
      unexpectedConfig = _objectWithoutProperties(_userConfig$npm, ['cjs', 'esModules', 'umd']);

  var unexpectedProps = Object.keys(unexpectedConfig);
  if (unexpectedProps.length > 0) {
    report.error('npm', unexpectedProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(unexpectedProps.length)} in ${_chalk2.default.cyan('babel')} config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#npm-build-configuration for supported config');
  }

  // cjs
  if ('cjs' in userConfig.npm) {
    if ((0, _utils.typeOf)(cjs) !== 'boolean') {
      report.error('npm.cjs', cjs, `Must be ${_chalk2.default.cyan('Boolean')}`);
    }
  }

  // esModules
  if ('esModules' in userConfig.npm) {
    if ((0, _utils.typeOf)(esModules) !== 'boolean') {
      report.error('npm.esModules', esModules, `Must be ${_chalk2.default.cyan('Boolean')}`);
    }
  }

  // umd
  if ('umd' in userConfig.npm) {
    if (umd === false) {
      // ok
    } else if ((0, _utils.typeOf)(umd) === 'string') {
      userConfig.npm.umd = { global: umd };
    } else if ((0, _utils.typeOf)(umd) !== 'object') {
      report.error('npm.umd', umd, `Must be a ${_chalk2.default.cyan('String')} (for ${_chalk2.default.cyan('global')} ` + `config only)}, an ${_chalk2.default.cyan('Object')} (for any UMD build options) ` + `or ${_chalk2.default.cyan('false')} (to explicitly disable the UMD build)`);
    } else {
      var umdGlobal = umd.global,
          externals = umd.externals,
          _unexpectedConfig = _objectWithoutProperties(umd, ['global', 'externals']);

      var _unexpectedProps = Object.keys(_unexpectedConfig);
      if (_unexpectedProps.length > 0) {
        report.error('npm.umd', _unexpectedProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(_unexpectedProps.length)} in ${_chalk2.default.cyan('npm.umd')} config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#umd-string--object for supported config');
      }

      if ('global' in umd && (0, _utils.typeOf)(umdGlobal) !== 'string') {
        report.error('npm.umd.global', umdGlobal, `Must be a ${_chalk2.default.cyan('String')}`);
      }

      if ('externals' in umd && (0, _utils.typeOf)(externals) !== 'object') {
        report.error('npm.umd.externals', externals, `Must be an ${_chalk2.default.cyan('Object')}`);
      }
    }
  }
}