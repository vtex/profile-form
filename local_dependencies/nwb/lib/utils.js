'use strict';

exports.__esModule = true;
exports.replaceArrayMerge = undefined;
exports.clean = clean;
exports.clearConsole = clearConsole;
exports.deepToString = deepToString;
exports.directoryExists = directoryExists;
exports.getArgsPlugins = getArgsPlugins;
exports.install = install;
exports.joinAnd = joinAnd;
exports.modulePath = modulePath;
exports.pluralise = pluralise;
exports.toSource = toSource;
exports.typeOf = typeOf;
exports.unique = unique;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _runSeries = require('run-series');

var _runSeries2 = _interopRequireDefault(_runSeries);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if the given directories exist and filter out any which don't.
 */
function checkDirectories(dirs, cb) {
  (0, _runSeries2.default)(dirs.map(function (dir) {
    return function (cb) {
      return _fsExtra2.default.stat(dir, function (err, stats) {
        if (err) return cb(err.code === 'ENOENT' ? null : err);
        cb(null, stats.isDirectory() ? dir : null);
      });
    };
  }), function (err, dirs) {
    if (err) return cb(err);
    cb(null, dirs.filter(function (dir) {
      return dir != null;
    }));
  });
}

/**
 * If any of the given directories exist, display a spinner and delete them.
 */

function clean(
// A description of what's being cleaned, e.g. 'app'
desc,
// Paths to delete
dirs, cb) {
  checkDirectories(dirs, function (err, dirs) {
    if (err != null) return cb(err);
    if (dirs == null || dirs.length === 0) return cb();
    var spinner = (0, _ora2.default)(`Cleaning ${desc}`).start();
    (0, _runSeries2.default)(dirs.map(function (dir) {
      return function (cb) {
        return _fsExtra2.default.remove(dir, cb);
      };
    }), function (err) {
      if (err) {
        spinner.fail();
        return cb(err);
      }
      spinner.succeed();
      cb();
    });
  });
}

/**
 * Clear console scrollback.
 */
function clearConsole() {
  // Hack for testing
  if (process.env.NWB_TEST) return;
  // This will completely wipe scrollback in cmd.exe on Windows - use cmd.exe's
  // `start` command to launch nwb's dev server in a new prompt if you don't
  // want to lose it.
  process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
}

/**
 * Log objects in their entirety so we can see everything in debug output.
 */
function deepToString(object) {
  return _util2.default.inspect(object, { colors: true, depth: null });
}

/**
 * Check if a directory exists.
 */
function directoryExists(dir) {
  try {
    return _fsExtra2.default.statSync(dir).isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 * Get a list of nwb plugin names passed as arguments.
 */
function getArgsPlugins(args) {
  var plugins = args.plugins || args.plugin;
  if (!plugins) return [];
  return plugins.split(',').map(function (name) {
    return name.replace(/^(nwb-)?/, 'nwb-');
  });
}

/**
 * Install packages from npm.
 */
function install(
// npm package names, which may be in package@version format
packages, options, cb) {
  var _options$args = options.args,
      args = _options$args === undefined ? null : _options$args,
      _options$check = options.check,
      check = _options$check === undefined ? false : _options$check,
      _options$cwd = options.cwd,
      cwd = _options$cwd === undefined ? process.cwd() : _options$cwd,
      _options$dev = options.dev,
      dev = _options$dev === undefined ? false : _options$dev,
      _options$save = options.save,
      save = _options$save === undefined ? false : _options$save;

  // If the command being run allows users to specify an nwb plugins option by
  // providing the args object here, make sure they're installed.

  if (args) {
    packages = packages.concat(getArgsPlugins(args));
  }

  if (check) {
    packages = packages.filter(function (pkg) {
      // Assumption: we're not dealing with scoped packages, which start with @
      var name = pkg.split('@')[0];
      try {
        _resolve2.default.sync(name, { basedir: cwd });
        return false;
      } catch (e) {
        return true;
      }
    });
  }

  if (packages.length === 0) {
    return process.nextTick(cb);
  }

  var npmArgs = ['install', '--silent', '--no-progress', '--no-package-lock'];

  if (save) {
    npmArgs.push(`--save${dev ? '-dev' : ''}`);
  }

  npmArgs = npmArgs.concat(packages);

  (0, _debug2.default)(`${cwd} $ npm ${npmArgs.join(' ')}`);
  var spinner = (0, _ora2.default)(`Installing ${joinAnd(packages)}`).start();
  var npm = (0, _crossSpawn2.default)('npm', npmArgs, { cwd, stdio: ['ignore', 'pipe', 'inherit'] });
  npm.on('close', function (code) {
    if (code !== 0) {
      spinner.fail();
      return cb(new Error('npm install failed'));
    }
    spinner.succeed();
    cb();
  });
}

/**
 * Join multiple items with a penultimate "and".
 */
function joinAnd(array) {
  var lastClause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'and';

  if (array.length === 0) return '';
  if (array.length === 1) return String(array[0]);
  return `${array.slice(0, -1).join(', ')} ${lastClause} ${array[array.length - 1]}`;
}

/**
 * Get the path to an npm module.
 */
function modulePath(module) {
  var basedir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.cwd();

  return _path2.default.dirname(_resolve2.default.sync(`${module}/package.json`, { basedir }));
}

function pluralise(count) {
  var suffixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',s';

  return suffixes.split(',')[count === 1 ? 0 : 1];
}

/**
 * Custom merge which replaces arrays instead of concatenating them.
 */
var replaceArrayMerge = exports.replaceArrayMerge = (0, _webpackMerge2.default)({ customizeArray(a, b, key) {
    return b;
  } });

/**
 * Hack to generate simple config file contents by stringifying to JSON, but
 * without JSON formatting.
 */
function toSource(obj) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
}

/**
 * Better typeof.
 */
function typeOf(o) {
  if (Number.isNaN(o)) return 'nan';
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

/**
 * @param {Array<string>} strings
 */
function unique(strings) {
  // eslint-disable-next-line
  return Object.keys(strings.reduce(function (o, s) {
    return o[s] = true, o;
  }, {}));
}