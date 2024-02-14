'use strict';

exports.__esModule = true;
exports.default = checkConfig;

var _config = require('../config');

function getFullEnv(env) {
  if (env === 'dev') return 'development';
  if (env === 'prod') return 'production';
  return env;
}

function checkConfig(args) {
  if (args.e || args.env) {
    process.env.NODE_ENV = getFullEnv(args.e || args.env);
  }
  var pluginConfig = (0, _config.getPluginConfig)(args);
  try {
    (0, _config.getUserConfig)({ _: [args.command || 'check-config'], config: args._[1] }, { check: true, pluginConfig, required: true });
  } catch (report) {
    if (!(report instanceof _config.UserConfigReport)) throw report;
    report.log();
  }
}
module.exports = exports['default'];