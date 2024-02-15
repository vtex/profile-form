'use strict';

exports.__esModule = true;
exports.default = test;

var _config = require('../config');

var _constants = require('../constants');

var _karmaServer = require('../karmaServer');

var _karmaServer2 = _interopRequireDefault(_karmaServer);

var _testInferno = require('./test-inferno');

var _testInferno2 = _interopRequireDefault(_testInferno);

var _testPreact = require('./test-preact');

var _testPreact2 = _interopRequireDefault(_testPreact);

var _testReact = require('./test-react');

var _testReact2 = _interopRequireDefault(_testReact);

var _testReactComponent = require('./test-react-component');

var _testReactComponent2 = _interopRequireDefault(_testReactComponent);

var _testWebModule = require('./test-web-module');

var _testWebModule2 = _interopRequireDefault(_testWebModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEST_COMMANDS = {
  [_constants.INFERNO_APP]: _testInferno2.default,
  [_constants.PREACT_APP]: _testPreact2.default,
  [_constants.REACT_APP]: _testReact2.default,
  [_constants.REACT_COMPONENT]: _testReactComponent2.default,
  [_constants.WEB_MODULE]: _testWebModule2.default

  /**
   * Generic test command, invokes the appropriate project type-specific command,
   * or runs with the default test config.
   */
};function test(args, cb) {
  var projectType = void 0;
  try {
    projectType = (0, _config.getProjectType)(args);
  } catch (e) {
    // pass
  }

  if (projectType && TEST_COMMANDS[projectType]) {
    TEST_COMMANDS[projectType](args, cb);
  } else {
    (0, _karmaServer2.default)(args, {}, cb);
  }
}
module.exports = exports['default'];