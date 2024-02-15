'use strict';

exports.__esModule = true;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _figures = require('figures');

var _figures2 = _interopRequireDefault(_figures);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserConfigReport = function () {
  function UserConfigReport() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        configFileExists = _ref.configFileExists,
        configPath = _ref.configPath;

    _classCallCheck(this, UserConfigReport);

    this.configFileExists = configFileExists;
    this.configPath = configPath;
    this.deprecations = [];
    this.errors = [];
    this.hints = [];
    this.hasArgumentOverrides = false;
  }

  UserConfigReport.prototype.deprecated = function deprecated(path) {
    for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messages[_key - 1] = arguments[_key];
    }

    this.deprecations.push({ path, messages });
  };

  UserConfigReport.prototype.error = function error(path, value, message) {
    this.errors.push({ path, value, message });
  };

  UserConfigReport.prototype.hasErrors = function hasErrors() {
    return this.errors.length > 0;
  };

  UserConfigReport.prototype.hasSomethingToReport = function hasSomethingToReport() {
    return this.errors.length + this.deprecations.length + this.hints.length > 0;
  };

  UserConfigReport.prototype.hint = function hint(path) {
    for (var _len2 = arguments.length, messages = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      messages[_key2 - 1] = arguments[_key2];
    }

    this.hints.push({ path, messages });
  };

  UserConfigReport.prototype.getConfigSource = function getConfigSource() {
    if (this.configFileExists) {
      var description = this.configPath;
      if (this.hasArgumentOverrides) {
        description += ' (with CLI argument overrides)';
      }
      return description;
    } else if (this.hasArgumentOverrides) {
      return 'config via CLI arguments';
    }
    return 'funsies';
  };

  UserConfigReport.prototype.getReport = function getReport() {
    var report = [];

    report.push(_chalk2.default.underline(`nwb config report for ${this.getConfigSource()}`));
    report.push('');

    if (!this.hasSomethingToReport()) {
      report.push(_chalk2.default.green(`${_figures2.default.tick} Nothing to report!`));
      return report.join('\n');
    }

    if (this.errors.length) {
      var count = this.errors.length > 1 ? `${this.errors.length} ` : '';
      report.push(_chalk2.default.red.underline(`${count}Error${(0, _utils.pluralise)(this.errors.length)}`));
      report.push('');
    }
    this.errors.forEach(function (_ref2) {
      var path = _ref2.path,
          value = _ref2.value,
          message = _ref2.message;

      report.push(`${_chalk2.default.red(`${_figures2.default.cross} ${path}`)} ${_chalk2.default.cyan('=')} ${_util2.default.inspect(value)}`);
      report.push(`  ${message}`);
      report.push('');
    });

    if (this.deprecations.length) {
      var _count = this.deprecations.length > 1 ? `${this.deprecations.length} ` : '';
      report.push(_chalk2.default.yellow.underline(`${_count}Deprecation Warning${(0, _utils.pluralise)(this.deprecations.length)}`));
      report.push('');
    }
    this.deprecations.forEach(function (_ref3) {
      var path = _ref3.path,
          messages = _ref3.messages;

      report.push(_chalk2.default.yellow(`${_figures2.default.warning} ${path}`));
      messages.forEach(function (message) {
        report.push(`  ${message}`);
      });
      report.push('');
    });

    if (this.hints.length) {
      var _count2 = this.hints.length > 1 ? `${this.hints.length} ` : '';
      report.push(_chalk2.default.cyan.underline(`${_count2}Hint${(0, _utils.pluralise)(this.hints.length)}`));
      report.push('');
    }
    this.hints.forEach(function (_ref4) {
      var path = _ref4.path,
          messages = _ref4.messages;

      report.push(_chalk2.default.cyan(`${_figures2.default.info} ${path}`));
      messages.forEach(function (message) {
        report.push(`  ${message}`);
      });
      report.push('');
    });

    return report.join('\n');
  };

  UserConfigReport.prototype.log = function log() {
    console.log(this.getReport());
  };

  return UserConfigReport;
}();

exports.default = UserConfigReport;
module.exports = exports['default'];