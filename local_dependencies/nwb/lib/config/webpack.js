'use strict';

exports.__esModule = true;
exports.processWebpackConfig = processWebpackConfig;
exports.prepareWebpackRuleConfig = prepareWebpackRuleConfig;
exports.prepareWebpackStyleConfig = prepareWebpackStyleConfig;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _constants = require('../constants');

var _createWebpackConfig = require('../createWebpackConfig');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_STYLE_LOADERS = new Set(['css', 'postcss']);

// TODO Remove in a future version
var warnedAboutEnzymeCompat = false;
var warnedAboutOldStyleRules = false;
var warnedAboutSinonCompat = false;

function processWebpackConfig(_ref) {
  var pluginConfig = _ref.pluginConfig,
      report = _ref.report,
      userConfig = _ref.userConfig;

  var _userConfig$webpack = userConfig.webpack,
      aliases = _userConfig$webpack.aliases,
      autoprefixer = _userConfig$webpack.autoprefixer,
      compat = _userConfig$webpack.compat,
      copy = _userConfig$webpack.copy,
      debug = _userConfig$webpack.debug,
      define = _userConfig$webpack.define,
      extractText = _userConfig$webpack.extractText,
      hoisting = _userConfig$webpack.hoisting,
      html = _userConfig$webpack.html,
      install = _userConfig$webpack.install,
      publicPath = _userConfig$webpack.publicPath,
      rules = _userConfig$webpack.rules,
      styles = _userConfig$webpack.styles,
      uglify = _userConfig$webpack.uglify,
      extra = _userConfig$webpack.extra,
      config = _userConfig$webpack.config,
      unexpectedConfig = _objectWithoutProperties(_userConfig$webpack, ['aliases', 'autoprefixer', 'compat', 'copy', 'debug', 'define', 'extractText', 'hoisting', 'html', 'install', 'publicPath', 'rules', 'styles', 'uglify', 'extra', 'config']);

  var unexpectedProps = Object.keys(unexpectedConfig);
  if (unexpectedProps.length > 0) {
    report.error('webpack', unexpectedProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(unexpectedProps.length)} in ${_chalk2.default.cyan('webpack')} config - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#webpack-configuration for supported config. ' + `If you were trying to add extra Webpack config, try putting it in ${_chalk2.default.cyan('webpack.extra')} instead`);
  }

  // aliases
  if ('aliases' in userConfig.webpack) {
    if ((0, _utils.typeOf)(aliases) !== 'object') {
      report.error('webpack.aliases', `type: ${(0, _utils.typeOf)(aliases)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    } else {
      checkForRedundantCompatAliases(userConfig.type, aliases, 'webpack.aliases', report);
    }
  }

  // autoprefixer
  if ('autoprefixer' in userConfig.webpack) {
    // Convenience: allow Autoprefixer browsers config to be configured as a String
    if ((0, _utils.typeOf)(autoprefixer) === 'string') {
      userConfig.webpack.autoprefixer = { browsers: autoprefixer };
    } else if ((0, _utils.typeOf)(autoprefixer) !== 'object') {
      report.error('webpack.autoprefixer', `type: ${(0, _utils.typeOf)(autoprefixer)}`, `Must be a ${_chalk2.default.cyan('String')} (for ${_chalk2.default.cyan('browsers')} config only) ` + `or an ${_chalk2.default.cyan('Object')} (for any Autoprefixer options)`);
    }
  }

  // compat
  if ('compat' in userConfig.webpack) {
    if ((0, _utils.typeOf)(compat) !== 'object') {
      report.error('webpack.compat', `type: ${(0, _utils.typeOf)(compat)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    } else {
      // Validate compat props
      var compatProps = Object.keys(compat);
      var unexpectedCompatProps = compatProps.filter(function (prop) {
        return !(prop in _createWebpackConfig.COMPAT_CONFIGS);
      });
      if (unexpectedCompatProps.length > 0) {
        report.error('webpack.compat', unexpectedCompatProps.join(', '), `Unexpected prop${(0, _utils.pluralise)(unexpectedCompatProps.length)} in ${_chalk2.default.cyan('webpack.compat')}. ` + `Valid props are: ${(0, _utils.joinAnd)(Object.keys(_createWebpackConfig.COMPAT_CONFIGS).map(function (p) {
          return _chalk2.default.cyan(p);
        }), 'or')}`);
      }

      if (compat.enzyme) {
        if (!warnedAboutEnzymeCompat) {
          report.deprecated('webpack.compat.enzyme', `The ${_chalk2.default.cyan('enzyme')} compat flag applies to Enzyme 2.x, which is no longer the current major version`, 'Consider upgrading Enzyme if you can, which now requires configuring Enzyme itself rather than Webpack config');
          warnedAboutEnzymeCompat = true;
        }
      }

      if (compat.sinon) {
        if (!warnedAboutSinonCompat) {
          report.deprecated('webpack.compat.sinon', `The ${_chalk2.default.cyan('sinon')} compat flag applies to Sinon 1.x, which is no longer the current major version`, 'Consider upgrading Sinon if you can, which now works with Webpack out of the box');
          warnedAboutSinonCompat = true;
        }
      }

      void ['intl', 'moment', 'react-intl'].forEach(function (compatProp) {
        if (!(compatProp in compat)) return;
        var config = compat[compatProp];
        var configType = (0, _utils.typeOf)(config);
        if (configType === 'string') {
          compat[compatProp] = { locales: [config] };
        } else if (configType === 'array') {
          compat[compatProp] = { locales: config };
        } else if (configType === 'object') {
          if ((0, _utils.typeOf)(config.locales) === 'string') {
            config.locales = [config.locales];
          } else if ((0, _utils.typeOf)(config.locales) !== 'array') {
            report.error(`webpack.compat.${compatProp}.locales`, config.locales, `Must be a ${_chalk2.default.cyan('String')} (single locale name) or an ${_chalk2.default.cyan('Array')} of locales`);
          }
        } else {
          report.error(`webpack.compat.${compatProp}`, `type: ${configType}`, `Must be a ${_chalk2.default.cyan('String')} (single locale name), an ${_chalk2.default.cyan('Array')} ` + `of locales or an ${_chalk2.default.cyan('Object')} with a ${_chalk2.default.cyan('locales')} property - ` + 'see https://github.com/insin/nwb/blob/master/docs/Configuration.md#compat-object ');
        }
      });
    }
  }

  // copy
  if ('copy' in userConfig.webpack) {
    if ((0, _utils.typeOf)(copy) === 'array') {
      userConfig.webpack.copy = { patterns: copy };
    } else if ((0, _utils.typeOf)(copy) === 'object') {
      if (!copy.patterns && !copy.options) {
        report.error('webpack.copy', copy, `Must include ${_chalk2.default.cyan('patterns')} or ${_chalk2.default.cyan('options')}`);
      }
      if (copy.patterns && (0, _utils.typeOf)(copy.patterns) !== 'array') {
        report.error('webpack.copy.patterns', copy.patterns, `Must be an ${_chalk2.default.cyan('Array')}`);
      }
      if (copy.options && (0, _utils.typeOf)(copy.options) !== 'object') {
        report.error('webpack.copy.options', copy.options, `Must be an ${_chalk2.default.cyan('Object')}`);
      }
    } else {
      report.error('webpack.copy', copy, `Must be an ${_chalk2.default.cyan('Array')} or an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // debug
  if (debug) {
    // Make it harder for the user to forget to disable the production debug build
    // if they've enabled it in the config file.
    report.hint('webpack.debug', "Don't forget to disable the debug build before building for production");
  }

  // define
  if ('define' in userConfig.webpack) {
    if ((0, _utils.typeOf)(define) !== 'object') {
      report.error('webpack.define', `type: ${(0, _utils.typeOf)(define)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // extractText
  if ('extractText' in userConfig.webpack) {
    var configType = (0, _utils.typeOf)(extractText);
    var help = `Must be ${_chalk2.default.cyan('false')} (to disable CSS extraction) or ` + `an ${_chalk2.default.cyan('Object')} (to configure ExtractTextPlugin)`;
    if (configType === 'boolean') {
      if (extractText !== false) {
        report.error('webpack.extractText', extractText, help);
      }
    } else if (configType !== 'object') {
      report.error('webpack.extractText', `type: ${configType}`, help);
    }
  }

  // hoisting
  if ('hoisting' in userConfig.webpack) {
    if ((0, _utils.typeOf)(hoisting) !== 'boolean') {
      report.error('webpack.hoisting', `type: ${(0, _utils.typeOf)(hoisting)}`, `Must be a ${_chalk2.default.cyan('Boolean')}`);
    }
  }

  // html
  if ('html' in userConfig.webpack) {
    if ((0, _utils.typeOf)(html) !== 'object') {
      report.error('webpack.html', `type: ${(0, _utils.typeOf)(html)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // install
  if ('install' in userConfig.webpack) {
    if ((0, _utils.typeOf)(install) !== 'object') {
      report.error('webpack.install', `type: ${(0, _utils.typeOf)(install)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    }
  }

  // publicPath
  if ('publicPath' in userConfig.webpack) {
    if ((0, _utils.typeOf)(publicPath) !== 'string') {
      report.error('webpack.publicPath', `type: ${(0, _utils.typeOf)(publicPath)}`, `Must be a ${_chalk2.default.cyan('String')}`);
    }
  }

  // rules
  if ('rules' in userConfig.webpack) {
    if ((0, _utils.typeOf)(rules) !== 'object') {
      report.error('webpack.rules', `type: ${(0, _utils.typeOf)(rules)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    } else {
      var error = false;
      Object.keys(rules).forEach(function (ruleId) {
        var rule = rules[ruleId];
        if (rule.use && (0, _utils.typeOf)(rule.use) !== 'array') {
          report.error(`webpack.rules.${ruleId}.use`, `type: ${(0, _utils.typeOf)(rule.use)}`, `Must be an ${_chalk2.default.cyan('Array')}`);
          error = true;
        }
      });
      if (!error) {
        prepareWebpackRuleConfig(rules);
      }
    }
  }

  // styles
  if ('styles' in userConfig.webpack) {
    var _configType = (0, _utils.typeOf)(styles);
    var _help = `Must be ${_chalk2.default.cyan("'old'")} (to use default style rules from nwb <= v0.15), ` + `${_chalk2.default.cyan('false')} (to disable default style rules) or ` + `an ${_chalk2.default.cyan('Object')} (to configure custom style rules)`;
    if (_configType === 'string' && styles !== 'old') {
      report.error('webpack.styles', styles, _help);
      if (!warnedAboutOldStyleRules) {
        report.deprecated('webpack.styles', 'Support for default style rules from nwb <= v0.15 will be removed in a future release');
        warnedAboutOldStyleRules = true;
      }
    } else if (_configType === 'boolean' && styles !== false) {
      report.error('webpack.styles', styles, _help);
    } else if (_configType !== 'object' && _configType !== 'boolean') {
      report.error('webpack.styles', `type: ${_configType}`, _help);
    } else {
      var styleTypeIds = ['css'];
      if (pluginConfig.cssPreprocessors) {
        styleTypeIds = styleTypeIds.concat(Object.keys(pluginConfig.cssPreprocessors));
      }
      var _error = false;
      Object.keys(styles).forEach(function (styleType) {
        if (styleTypeIds.indexOf(styleType) === -1) {
          report.error('webpack.styles', `property: ${styleType}`, `Unknown style type - must be ${(0, _utils.joinAnd)(styleTypeIds.map(function (s) {
            return _chalk2.default.cyan(s);
          }), 'or')}`);
          _error = true;
        } else if ((0, _utils.typeOf)(styles[styleType]) !== 'array') {
          report.error(`webpack.styles.${styleType}`, `type: ${(0, _utils.typeOf)(styles[styleType])}`, `Must be an ${_chalk2.default.cyan('Array')} - if you don't need multiple custom rules, ` + `configure the defaults via ${_chalk2.default.cyan('webpack.rules')} instead`);
          _error = true;
        } else {
          styles[styleType].forEach(function (styleConfig, index) {
            var test = styleConfig.test,
                include = styleConfig.include,
                exclude = styleConfig.exclude,
                loaderConfig = _objectWithoutProperties(styleConfig, ['test', 'include', 'exclude']);

            Object.keys(loaderConfig).forEach(function (loaderId) {
              if (!DEFAULT_STYLE_LOADERS.has(loaderId) && loaderId !== styleType) {
                // XXX Assumption: preprocessors provide a single loader which
                //     is configured with the same id as the style type id.
                // XXX Using Array.from() manually as babel-preset-env with a
                //     Node 4 target is tranpiling Array spreads to concat()
                //     calls without ensuring Sets are converted to Arrays.
                var loaderIds = Array.from(new Set([].concat(Array.from(DEFAULT_STYLE_LOADERS), [styleType]))).map(function (id) {
                  return _chalk2.default.cyan(id);
                });
                report.error(`webpack.styles.${styleType}[${index}]`, `property: ${loaderId}`, `Must be ${_chalk2.default.cyan('include')}, ${_chalk2.default.cyan('exclude')} or a loader id: ${(0, _utils.joinAnd)(loaderIds, 'or')}`);
                _error = true;
              }
            });
          });
        }
      });
      if (!_error) {
        prepareWebpackStyleConfig(styles);
      }
    }
  }

  // uglify
  if ('uglify' in userConfig.webpack) {
    if (uglify !== false && (0, _utils.typeOf)(uglify) !== 'object') {
      report.error(`webpack.uglify`, uglify, `Must be ${_chalk2.default.cyan('false')} (to disable UglifyJsPlugin) or ` + `an ${_chalk2.default.cyan('Object')} (to configure UglifyJsPlugin)`);
    }
  }

  // extra
  if ('extra' in userConfig.webpack) {
    if ((0, _utils.typeOf)(extra) !== 'object') {
      report.error('webpack.extra', `type: ${(0, _utils.typeOf)(extra)}`, `Must be an ${_chalk2.default.cyan('Object')}`);
    } else {
      if ((0, _utils.typeOf)(extra.output) === 'object' && extra.output.publicPath) {
        report.hint('webpack.extra.output.publicPath', `You can use the more convenient ${_chalk2.default.cyan('webpack.publicPath')} config instead`);
      }
      if ((0, _utils.typeOf)(extra.resolve) === 'object' && extra.resolve.alias) {
        report.hint('webpack.extra.resolve.alias', `You can use the more convenient ${_chalk2.default.cyan('webpack.aliases')} config instead`);
        checkForRedundantCompatAliases(userConfig.type, extra.resolve.alias, 'webpack.extra.resolve.alias', report);
      }
    }
  }

  // config
  if ('config' in userConfig.webpack && (0, _utils.typeOf)(config) !== 'function') {
    report.error(`webpack.config`, `type: ${(0, _utils.typeOf)(config)}`, `Must be a ${_chalk2.default.cyan('Function')}`);
  }
}

/**
 * Tell the user if they've manually set up the same React compatibility aliases
 * nwb configured by default.
 */
function checkForRedundantCompatAliases(projectType, aliases, configPath, report) {
  if (!new Set([_constants.INFERNO_APP, _constants.PREACT_APP]).has(projectType)) return;

  var compatModule = `${projectType.split('-')[0]}-compat`;
  if (aliases.react && aliases.react.includes(compatModule)) {
    report.hint(`${configPath}.react`, `nwb aliases ${_chalk2.default.yellow('react')} to ${_chalk2.default.cyan(compatModule)} by default, so you can remove this config`);
  }
  if (aliases['react-dom'] && aliases['react-dom'].includes(compatModule)) {
    report.hint(`${configPath}.react-dom`, `nwb aliases ${_chalk2.default.yellow('react-dom')} to ${_chalk2.default.cyan(compatModule)} by default, so you can remove this config`);
  }
}

/**
 * Move loader options into an options object, allowing users to provide flatter
 * config.
 */
function prepareWebpackRuleConfig(rules) {
  Object.keys(rules).forEach(function (ruleId) {
    var rule = rules[ruleId];
    // XXX Special case for stylus-loader, which uses a 'use' option for plugins
    if (rule.use && !/stylus$/.test(ruleId) || rule.options) return;

    var exclude = rule.exclude,
        include = rule.include,
        test = rule.test,
        loader = rule.loader,
        options = _objectWithoutProperties(rule, ['exclude', 'include', 'test', 'loader']);

    if (Object.keys(options).length > 0) {
      rule.options = options;
      Object.keys(options).forEach(function (prop) {
        return delete rule[prop];
      });
    }
  });
}

/**
 * Move loader options into a loaders object, allowing users to provide flatter
 * config.
 */
function prepareWebpackStyleConfig(styles) {
  Object.keys(styles).forEach(function (type) {
    styles[type].forEach(function (styleConfig) {
      var exclude = styleConfig.exclude,
          include = styleConfig.include,
          loaderConfig = _objectWithoutProperties(styleConfig, ['exclude', 'include']);

      if (Object.keys(loaderConfig).length > 0) {
        styleConfig.loaders = {};
        Object.keys(loaderConfig).forEach(function (loader) {
          styleConfig.loaders[loader] = { options: styleConfig[loader] };
          delete styleConfig[loader];
        });
      }
    });
  });
}