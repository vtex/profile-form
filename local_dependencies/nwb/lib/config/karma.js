'use strict';

exports.__esModule = true;
exports.processKarmaConfig = processKarmaConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function processKarmaConfig(_ref) {
  var report = _ref.report,
      userConfig = _ref.userConfig;

  var _userConfig$karma = userConfig.karma,
      browsers = _userConfig$karma.browsers,
      excludeFromCoverage = _userConfig$karma.excludeFromCoverage,
      frameworks = _userConfig$karma.frameworks,
      plugins = _userConfig$karma.plugins,
      reporters = _userConfig$karma.reporters,
      testContext = _userConfig$karma.testContext,
      testFiles = _userConfig$karma.testFiles,
      extra = _userConfig$karma.extra,
      config = _userConfig$karma.config,
      unexpectedConfig = _objectWithoutProperties(_userConfig$karma, ['browsers', 'excludeFromCoverage', 'frameworks', 'plugins', 'reporters', 'testContext', 'testFiles', 'extra', 'config']);

  var unexpectedProps = Object.keys(unexpectedConfig);
  if (unexpectedProps.length > 0) {
    report.error('karma', unexpectedProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(unexpectedProps.length)} in ${_chalk2.default.cyan('karma')} config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#karma-configuration for supported config.' + `If you were trying to add extra Karma config, try putting it in ${_chalk2.default.cyan('karma.extra')} instead`);
  }

  // browsers
  if ('browsers' in userConfig.karma) {
    if ((0, _utils.typeOf)(browsers) !== 'array') {
      report.error('karma.browsers', browsers, `Must be an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // excludeFromCoverage
  if ('excludeFromCoverage' in userConfig.karma) {
    if ((0, _utils.typeOf)(excludeFromCoverage) === 'string') {
      userConfig.karma.excludeFromCoverage = [excludeFromCoverage];
    } else if ((0, _utils.typeOf)(excludeFromCoverage) !== 'array') {
      report.error('karma.excludeFromCoverage', excludeFromCoverage, `Must be a ${_chalk2.default.cyan('String')} or an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // frameworks
  if ('frameworks' in userConfig.karma) {
    if ((0, _utils.typeOf)(frameworks) !== 'array') {
      report.error('karma.frameworks', frameworks, `Must be an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // plugins
  if ('plugins' in userConfig.karma) {
    if ((0, _utils.typeOf)(plugins) !== 'array') {
      report.error('karma.plugins', plugins, `Must be an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // reporters
  if ('reporters' in userConfig.karma) {
    if ((0, _utils.typeOf)(reporters) !== 'array') {
      report.error('karma.reporters', reporters, `Must be an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // testContext
  if ('testContext' in userConfig.karma) {
    if ((0, _utils.typeOf)(testContext) !== 'string') {
      report.error('karma.testContext', testContext, `Must be a ${_chalk2.default.cyan('String')}`);
    } else if (!_fs2.default.existsSync(testContext)) {
      report.error('karma.testContext', testContext, `The specified test context module does not exist`);
    }
  }

  // testFiles
  if ('testFiles' in userConfig.karma) {
    if ((0, _utils.typeOf)(testFiles) === 'string') {
      userConfig.karma.testFiles = [testFiles];
    } else if ((0, _utils.typeOf)(testFiles) !== 'array') {
      report.error('karma.testFiles', testFiles, `Must be a ${_chalk2.default.cyan('String')} or an ${_chalk2.default.cyan('Array')}`);
    }
  }

  // extra
  if ('extra' in userConfig.karma) {
    if ((0, _utils.typeOf)(extra) !== 'object') {
      report.error('karma.extra', `type: ${(0, _utils.typeOf)(extra)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // config
  if ('config' in userConfig.karma && (0, _utils.typeOf)(config) !== 'function') {
    report.error(`karma.config`, `type: ${(0, _utils.typeOf)(config)}`, `Must be a ${_chalk2.default.cyan('Function')}`);
  }
}