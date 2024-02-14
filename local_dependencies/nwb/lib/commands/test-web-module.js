'use strict';

exports.__esModule = true;
exports.default = testWebModule;

var _karmaServer = require('../karmaServer');

var _karmaServer2 = _interopRequireDefault(_karmaServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testWebModule(args, cb) {
  (0, _karmaServer2.default)(args, {
    babel: {
      stage: 1
    }
  }, cb);
}
module.exports = exports['default'];