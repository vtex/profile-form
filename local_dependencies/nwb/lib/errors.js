"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error related to user input or configuration, or anything else the user is
 * responsible for and can fix.
 */
var UserError = exports.UserError = function (_Error) {
  _inherits(UserError, _Error);

  function UserError(message) {
    _classCallCheck(this, UserError);

    // Make instanceof UserError work in ES5
    // $FlowFixMe
    var _this = _possibleConstructorReturn(this, _Error.call(this, message));

    _this.constructor = UserError;
    // $FlowFixMe
    _this.__proto__ = UserError.prototype; // eslint-disable-line no-proto
    return _this;
  }

  return UserError;
}(Error);

var KarmaExitCodeError = exports.KarmaExitCodeError = function KarmaExitCodeError(exitCode) {
  _classCallCheck(this, KarmaExitCodeError);

  this.exitCode = exitCode;
};

var ConfigValidationError = exports.ConfigValidationError = function ConfigValidationError(report) {
  _classCallCheck(this, ConfigValidationError);

  this.report = report;
};