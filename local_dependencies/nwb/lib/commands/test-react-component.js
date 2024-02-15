'use strict';

exports.__esModule = true;
exports.default = testReactComponent;

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _karmaServer = require('../karmaServer');

var _karmaServer2 = _interopRequireDefault(_karmaServer);

var _react = require('../react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testReactComponent(args, cb) {
  (0, _karmaServer2.default)(args, (0, _webpackMerge2.default)((0, _react2.default)(args).getKarmaTestConfig(), {
    babel: {
      stage: 1
    }
  }), cb);
}
module.exports = exports['default'];