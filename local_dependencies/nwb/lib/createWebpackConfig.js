'use strict';

exports.__esModule = true;
exports.COMPAT_CONFIGS = exports.loaderConfigName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mergeRuleConfig = mergeRuleConfig;
exports.mergeLoaderConfig = mergeLoaderConfig;
exports.createRuleConfigFactory = createRuleConfigFactory;
exports.createLoaderConfigFactory = createLoaderConfigFactory;
exports.createStyleLoaders = createStyleLoaders;
exports.createRules = createRules;
exports.createExtraRules = createExtraRules;
exports.createPlugins = createPlugins;
exports.getCompatConfig = getCompatConfig;
exports.default = createWebpackConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _copyWebpackPlugin = require('copy-webpack-plugin');

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _npmInstallWebpack2Plugin = require('npm-install-webpack2-plugin');

var _npmInstallWebpack2Plugin2 = _interopRequireDefault(_npmInstallWebpack2Plugin);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _createBabelConfig = require('./createBabelConfig');

var _createBabelConfig2 = _interopRequireDefault(_createBabelConfig);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _errors = require('./errors');

var _utils = require('./utils');

var _WebpackStatusPlugin = require('./WebpackStatusPlugin');

var _WebpackStatusPlugin2 = _interopRequireDefault(_WebpackStatusPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // XXX Temporary
// $FlowFixMe


var DEFAULT_UGLIFY_CONFIG = {
  cache: true,
  parallel: true,
  sourceMap: true
};

function createUglifyConfig(userWebpackConfig) {
  if (userWebpackConfig.debug) {
    return (0, _webpackMerge2.default)(DEFAULT_UGLIFY_CONFIG, {
      uglifyOptions: {
        beautify: true,
        mangle: false
      }
    },
    // Preserve user 'compress' config if present, as it affects what gets
    // removed from the production build.
    typeof userWebpackConfig.uglify === 'object' && typeof userWebpackConfig.uglify.uglifyConfig === 'object' && 'compress' in userWebpackConfig.uglify.uglifyConfig ? { uglifyOptions: { compress: userWebpackConfig.uglify.uglifyConfig.compress } } : {});
  }
  return (0, _webpackMerge2.default)(DEFAULT_UGLIFY_CONFIG, typeof userWebpackConfig.uglify === 'object' ? userWebpackConfig.uglify : {});
}

/**
 * Merge webpack rule config objects.
 */
function mergeRuleConfig(defaultConfig) {
  var buildConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var rule = void 0;
  // Omit the default loader and options if the user is configuring their own
  if (defaultConfig.loader && (userConfig.loader || userConfig.use)) {
    var defaultLoader = defaultConfig.loader,
        defaultOptions = defaultConfig.options,
        defaultRuleConfig = _objectWithoutProperties(defaultConfig, ['loader', 'options']);

    rule = (0, _webpackMerge2.default)(defaultRuleConfig, userConfig);
  } else {
    rule = (0, _utils.replaceArrayMerge)(defaultConfig, buildConfig, userConfig);
  }
  if (rule.options && Object.keys(rule.options).length === 0) {
    delete rule.options;
  }
  return rule;
}

/**
 * Merge webpack loader config objects.
 */
function mergeLoaderConfig(defaultConfig) {
  var buildConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var loader = void 0;
  // If the loader is being changed, only use the provided config
  if (userConfig.loader) {
    loader = _extends({}, userConfig);
  } else {
    // The only arrays used in default options are for PostCSS plugins, which we
    // want the user to be able to completely override.
    loader = (0, _utils.replaceArrayMerge)(defaultConfig, buildConfig, userConfig);
  }
  if (loader.options && Object.keys(loader.options).length === 0) {
    delete loader.options;
  }
  return loader;
}

/**
 * Create a function which configures a rule identified by a unique id, with
 * the option to override defaults with build-specific and user config.
 */
function createRuleConfigFactory() {
  var buildConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (id, defaultConfig) {
    if (id) {
      // Allow the user to turn off rules by configuring them with false
      if (userConfig[id] === false) {
        return null;
      }
      var rule = mergeRuleConfig(defaultConfig, buildConfig[id], userConfig[id]);
      return rule;
    }
    return defaultConfig;
  };
}

/**
 * Create a function which configures a loader identified by a unique id, with
 * the option to override defaults with build-specific and user config.
 */
function createLoaderConfigFactory() {
  var buildConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (id, defaultConfig) {
    if (id) {
      var _loader = mergeLoaderConfig(defaultConfig, buildConfig[id], userConfig[id]);
      return _loader;
    }
    return defaultConfig;
  };
}

/**
 * Create a function which applies a prefix to a name when a prefix is given,
 * unless the prefix ends with the name, in which case the prefix itself is
 * returned.
 * The latter rule is to allow rules created for CSS preprocessor plugins to
 * be given unique ids for user configuration without duplicating the name of
 * the rule.
 * e.g.: loaderConfigName('sass')('css') => 'sass-css'
 *       loaderConfigName('sass')('sass') => 'sass' (as opposed to 'sass-sass')
 */
var loaderConfigName = exports.loaderConfigName = function loaderConfigName(prefix) {
  return function (name) {
    if (prefix && prefix.endsWith(name)) {
      return prefix;
    }
    return prefix ? `${prefix}-${name}` : name;
  };
};

/**
 * Create a list of chained loader config objects for a static build (default)
 * or serving.
 */
function createStyleLoaders(createLoader, userWebpackConfig) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$preprocessor = options.preprocessor,
      preprocessor = _options$preprocessor === undefined ? null : _options$preprocessor,
      _options$prefix = options.prefix,
      prefix = _options$prefix === undefined ? null : _options$prefix,
      _options$server = options.server,
      server = _options$server === undefined ? false : _options$server;

  var name = loaderConfigName(prefix);
  var styleLoader = createLoader(name('style'), {
    loader: require.resolve('style-loader'),
    options: {
      // Only enable style-loader HMR when we're serving a development build
      hmr: Boolean(server)
    }
  });
  var loaders = [createLoader(name('css'), {
    loader: require.resolve('css-loader'),
    options: {
      // Apply postcss-loader to @imports
      importLoaders: 1
    }
  }), createLoader(name('postcss'), {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: name('postcss'),
      plugins: createDefaultPostCSSPlugins(userWebpackConfig)
    }
  })];

  if (preprocessor) {
    loaders.push(createLoader(preprocessor.id ? name(preprocessor.id) : null, preprocessor.config));
  }

  if (server || userWebpackConfig.extractText === false) {
    loaders.unshift(styleLoader);
    return loaders;
  } else {
    return _extractTextWebpackPlugin2.default.extract({
      fallback: styleLoader,
      use: loaders
    });
  }
}

/**
 * Create style rules for nwb >= 0.16.
 */
function createStyleRules(server, userWebpackConfig, pluginConfig, createRule, createLoader) {
  var styleConfig = userWebpackConfig.styles || {};
  var styleRules = [];

  // Configured styles rules, with individual loader configuration as part of
  // the definition.
  Object.keys(styleConfig).forEach(function (type) {
    var _ref;

    var test = void 0,
        preprocessor = void 0;
    if (type === 'css') {
      test = /\.css$/;
    } else {
      var preprocessorConfig = pluginConfig.cssPreprocessors[type];
      test = preprocessorConfig.test;
      preprocessor = { id: null, config: { loader: preprocessorConfig.loader } };
    }
    var ruleConfigs = (_ref = []).concat.apply(_ref, styleConfig[type]);
    ruleConfigs.forEach(function (ruleConfig) {
      var loaderConfig = ruleConfig.loaders,
          topLevelRuleConfig = _objectWithoutProperties(ruleConfig, ['loaders']);
      // Empty build config, as all loader config for custom style rules will be
      // provided by the user.


      var styleRuleLoader = createLoaderConfigFactory({}, loaderConfig);
      styleRules.push(_extends({
        test,
        use: createStyleLoaders(styleRuleLoader, userWebpackConfig, { preprocessor, server })
      }, topLevelRuleConfig));
    });
  });

  // Default CSS rule when nothing is configured, tweakable via webpack.rules by
  // unique id.
  if (!('css' in styleConfig)) {
    styleRules.push(createRule('css-rule', {
      test: /\.css$/,
      use: createStyleLoaders(createLoader, userWebpackConfig, { server })
    }));
  }

  // Default rule for each CSS preprocessor plugin when nothing is configured,
  // tweakable via webpack.rules by unique id.
  if (pluginConfig.cssPreprocessors) {
    Object.keys(pluginConfig.cssPreprocessors).forEach(function (id) {
      if (id in styleConfig) return;
      var _pluginConfig$cssPrep = pluginConfig.cssPreprocessors[id],
          test = _pluginConfig$cssPrep.test,
          preprocessorLoader = _pluginConfig$cssPrep.loader;

      styleRules.push(createRule(`${id}-rule`, {
        test,
        use: createStyleLoaders(createLoader, userWebpackConfig, {
          prefix: id,
          preprocessor: { id, config: { loader: preprocessorLoader } },
          server
        })
      }));
    });
  }

  return styleRules;
}

// TODO Remove in a future version
/**
 * Create default style rules for nwb < 0.16.
 */
function createLegacyStyleRules(server, userWebpackConfig, pluginConfig, createRule, createLoader) {
  var styleRules = [createRule('css-pipeline', {
    test: /\.css$/,
    use: createStyleLoaders(createLoader, userWebpackConfig, { server }),
    exclude: /node_modules/
  }), createRule('vendor-css-pipeline', {
    test: /\.css$/,
    use: createStyleLoaders(createLoader, userWebpackConfig, { prefix: 'vendor', server }),
    include: /node_modules/
  })];

  if (pluginConfig.cssPreprocessors) {
    Object.keys(pluginConfig.cssPreprocessors).forEach(function (id) {
      var _pluginConfig$cssPrep2 = pluginConfig.cssPreprocessors[id],
          test = _pluginConfig$cssPrep2.test,
          preprocessorLoader = _pluginConfig$cssPrep2.loader;

      styleRules.push(createRule(`${id}-pipeline`, {
        test,
        use: createStyleLoaders(createLoader, userWebpackConfig, {
          prefix: id,
          preprocessor: { id, config: { loader: preprocessorLoader } },
          server
        }),
        exclude: /node_modules/
      }), createRule(`vendor-${id}-pipeline`, {
        test,
        use: createStyleLoaders(createLoader, userWebpackConfig, {
          prefix: `vendor-${id}`,
          preprocessor: { id, config: { loader: preprocessorLoader } },
          server
        }),
        include: /node_modules/
      }));
    });
  }

  return styleRules;
}

/**
 * Final webpack rules config consists of:
 * - the default set of rules created in this function, with build and user
 *   config tweaks based on rule id.
 * - extra rules defined in build config, with user config tweaks based
 *   on rule id.
 * - extra rules created for CSS preprocessor plugins, with user config
 *   tweaks based on loader id.
 * - extra rules defined in user config.
 */
function createRules(server) {
  var buildConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userWebpackConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var pluginConfig = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var createRule = createRuleConfigFactory(buildConfig, userWebpackConfig.rules);
  var createLoader = createLoaderConfigFactory(buildConfig, userWebpackConfig.rules);

  // Default options for url-loader
  var urlLoaderOptions = {
    // Don't inline anything by default
    limit: 1,
    // Always use a hash to prevent files with the same name causing issues
    name: '[name].[hash:8].[ext]'
  };

  var rules = [createRule('babel', {
    test: /\.js$/,
    loader: require.resolve('babel-loader'),
    exclude: process.env.NWB_TEST ? /(node_modules|nwb[\\/]polyfills\.js$)/ : /node_modules/,
    options: {
      // Don't look for .babelrc files
      babelrc: false,
      // Cache transformations to the filesystem (in default temp dir)
      cacheDirectory: true
    }
  }), createRule('graphics', {
    test: /\.(gif|png|webp)$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  }), createRule('svg', {
    test: /\.svg$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  }), createRule('jpeg', {
    test: /\.jpe?g$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  }), createRule('fonts', {
    test: /\.(eot|otf|ttf|woff|woff2)$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  }), createRule('video', {
    test: /\.(mp4|ogg|webm)$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  }), createRule('audio', {
    test: /\.(wav|mp3|m4a|aac|oga)$/,
    loader: require.resolve('url-loader'),
    options: _extends({}, urlLoaderOptions)
  })].concat(createExtraRules(buildConfig.extra, userWebpackConfig.rules));

  // Add rules with chained style loaders, using ExtractTextPlugin for builds
  if (userWebpackConfig.styles === 'old') {
    // nwb <= 0.15 default
    rules = rules.concat(createLegacyStyleRules(server, userWebpackConfig, pluginConfig, createRule, createLoader));
  } else if (userWebpackConfig.styles !== false) {
    rules = rules.concat(createStyleRules(server, userWebpackConfig, pluginConfig, createRule, createLoader));
  }

  return rules.filter(function (rule) {
    return rule != null;
  });
}

/**
 * Create rules from rule definitions which may include an id attribute for
 * user customisation. It's assumed these are being created from build config.
 */
function createExtraRules() {
  var extraRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var createRule = createRuleConfigFactory({}, userConfig);
  return extraRules.map(function (extraRule) {
    var id = extraRule.id,
        ruleConfig = _objectWithoutProperties(extraRule, ['id']);

    return createRule(id, ruleConfig);
  });
}

/**
 * Plugin for HtmlPlugin which inlines content for an extracted Webpack manifest
 * into the HTML in a <script> tag before other emitted asssets are injected by
 * HtmlPlugin itself.
 */
function injectManifestPlugin() {
  this.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (data, cb) {
      Object.keys(compilation.assets).forEach(function (key) {
        if (!key.startsWith('manifest.')) return;
        var children = compilation.assets[key].children;

        if (children && children[0]) {
          data.html = data.html.replace(/^(\s*)<\/body>/m, `$1<script>${children[0]._value}</script>\n$1</body>`);
          // Remove the manifest from HtmlPlugin's assets to prevent a <script>
          // tag being created for it.
          var manifestIndex = data.assets.js.indexOf(data.assets.publicPath + key);
          data.assets.js.splice(manifestIndex, 1);
          delete data.assets.chunks.manifest;
        }
      });
      cb(null, data);
    });
  });
}

function getCopyPluginArgs(buildConfig, userConfig) {
  var patterns = [];
  var options = {};
  if (buildConfig) {
    patterns = patterns.concat(buildConfig);
  }
  if (userConfig) {
    patterns = patterns.concat(userConfig.patterns || []);
    options = userConfig.options || {};
  }
  return [patterns, options];
}

/**
 * Final webpack plugin config consists of:
 * - the default set of plugins created by this function based on whether or not
 *   a server build is being configured, whether or not the build is for an
 *   app (for which HTML will be generated), plus environment variables.
 * - extra plugins managed by this function, whose inclusion is triggered by
 *   build config, which provides default configuration for them which can be
 *   tweaked by user plugin config when appropriate.
 * - any extra plugins defined in build and user config (extra user plugins are
 *   not handled here, but by the final merge of webpack.extra config).
 */
function createPlugins(server) {
  var buildConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var development = process.env.NODE_ENV === 'development';
  var production = process.env.NODE_ENV === 'production';

  var plugins = [
  // Enforce case-sensitive import paths
  new _caseSensitivePathsWebpackPlugin2.default(),
  // Replace specified expressions with values
  new _webpack2.default.DefinePlugin(_extends({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }, buildConfig.define, userConfig.define))];

  if (server) {
    // HMR is enabled by default but can be explicitly disabled
    if (server.hot !== false) {
      plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin());
    }
    if (buildConfig.status) {
      plugins.push(new _WebpackStatusPlugin2.default(buildConfig.status));
    }
    // Use paths as names when serving
    plugins.push(new _webpack2.default.NamedModulesPlugin());
  }
  // If we're not serving, we're creating a static build
  else {
      if (userConfig.extractText !== false) {
        // Extract imported stylesheets out into .css files
        plugins.push(new _extractTextWebpackPlugin2.default(_extends({
          allChunks: true,
          filename: production ? `[name].[contenthash:8].css` : '[name].css'
        }, userConfig.extractText)));
      }

      // Move modules imported from node_modules/ into a vendor chunk when enabled
      if (buildConfig.vendor) {
        plugins.push(new _webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks(module, count) {
            return module.resource && module.resource.includes('node_modules');
          }
        }));
      }

      // If we're generating an HTML file, we must be building a web app, so
      // configure deterministic hashing for long-term caching.
      if (buildConfig.html) {
        plugins.push(
        // Generate stable module ids instead of having Webpack assign integers.
        // NamedModulesPlugin allows for easier debugging and
        // HashedModuleIdsPlugin does this without adding too much to bundle
        // size.
        development || userConfig.debug ? new _webpack2.default.NamedModulesPlugin() : new _webpack2.default.HashedModuleIdsPlugin(),
        // The Webpack manifest is normally folded into the last chunk, changing
        // its hash - prevent this by extracting the manifest into its own
        // chunk - also essential for deterministic hashing.
        new _webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
        // Inject the Webpack manifest into the generated HTML as a <script>
        injectManifestPlugin);
      }
    }

  if (production) {
    plugins.push(new _webpack2.default.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }));
    if (userConfig.uglify !== false) {
      plugins.push(new _uglifyjsWebpackPlugin2.default(createUglifyConfig(userConfig)));
    }
    // Use partial scope hoisting/module concatenation
    if (userConfig.hoisting) {
      plugins.push(new _webpack.optimize.ModuleConcatenationPlugin());
    }
  }

  // Generate an HTML file for web apps which pulls in generated resources
  if (buildConfig.html) {
    plugins.push(new _htmlWebpackPlugin2.default(_extends({
      chunksSortMode: 'dependency',
      template: _path2.default.join(__dirname, '../templates/webpack-template.html')
    }, buildConfig.html, userConfig.html)));
  }

  // Copy static resources
  if (buildConfig.copy) {
    plugins.push(new (Function.prototype.bind.apply(_copyWebpackPlugin2.default, [null].concat(getCopyPluginArgs(buildConfig.copy, userConfig.copy))))());
  }

  // Automatically install missing npm dependencies and add them to package.json
  // if present.
  // Must be enabled with an --install or --auto-install flag.
  if (buildConfig.autoInstall) {
    plugins.push(new _npmInstallWebpack2Plugin2.default(_extends({
      peerDependencies: false,
      quiet: true
    }, userConfig.install)));
  }

  // Insert a banner comment at the top of generated files - used for UMD builds
  if (buildConfig.banner) {
    plugins.push(new _webpack2.default.BannerPlugin({ banner: buildConfig.banner }));
  }

  // Escape hatch for any extra plugins a particular build ever needs to add
  if (buildConfig.extra) {
    plugins = plugins.concat(buildConfig.extra);
  }

  return plugins;
}

function createDefaultPostCSSPlugins(userWebpackConfig) {
  return [(0, _autoprefixer2.default)(_extends({
    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
  }, userWebpackConfig.autoprefixer))];
}

var COMPAT_CONFIGS = exports.COMPAT_CONFIGS = {
  enzyme: {
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  },
  intl(options) {
    return {
      plugins: [new _webpack2.default.ContextReplacementPlugin(/intl[/\\]locale-data[/\\]jsonp$/, new RegExp(`^\\.\\/(${options.locales.join('|')})$`))]
    };
  },
  moment(options) {
    return {
      plugins: [new _webpack2.default.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(`^\\.\\/(${options.locales.join('|')})$`))]
    };
  },
  'react-intl'(options) {
    return {
      plugins: [new _webpack2.default.ContextReplacementPlugin(/react-intl[/\\]locale-data$/, new RegExp(`^\\.\\/(${options.locales.join('|')})$`))]
    };
  },
  sinon: {
    module: {
      noParse: [/[/\\]sinon\.js/]
    },
    resolve: {
      alias: {
        sinon: 'sinon/pkg/sinon'
      }
    }
  }

  /**
   * Create a chunk of webpack config containing compatibility tweaks for
   * libraries which are known to cause issues, to be merged into the generated
   * config.
   * Returns null if there's nothing to merge based on user config.
   */
};function getCompatConfig() {
  var userCompatConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var configs = [];
  Object.keys(userCompatConfig).map(function (lib) {
    if (!userCompatConfig[lib]) return;
    var compatConfig = COMPAT_CONFIGS[lib];
    if ((0, _utils.typeOf)(compatConfig) === 'function') {
      compatConfig = compatConfig(userCompatConfig[lib]);
      if (!compatConfig) return;
    }
    configs.push(compatConfig);
  });
  if (configs.length === 0) return null;
  if (configs.length === 1) return _extends({}, configs[0]);
  return _webpackMerge2.default.apply(undefined, configs);
}

/**
 * Add default polyfills to the head of the entry array.
 */
function addPolyfillsToEntry(entry) {
  if ((0, _utils.typeOf)(entry) === 'array') {
    entry.unshift(require.resolve('../polyfills'));
  } else {
    // Assumption: there will only be one entry point, naming the entry chunk
    entry[Object.keys(entry)[0]].unshift(require.resolve('../polyfills'));
  }
}

/**
 * Create a webpack config with a curated set of default rules suitable for
 * creating a static build (default) or serving an app with hot reloading.
 */
function createWebpackConfig(buildConfig) {
  var pluginConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  (0, _debug2.default)('createWebpackConfig buildConfig: %s', (0, _utils.deepToString)(buildConfig));

  // Final webpack config is primarily driven by build configuration for the nwb
  // command being run. Each command configures a default, working webpack
  // configuration for the task it needs to perform.

  var _buildConfig$babel = buildConfig.babel,
      buildBabelConfig = _buildConfig$babel === undefined ? {} : _buildConfig$babel,
      entry = buildConfig.entry,
      buildOutputConfig = buildConfig.output,
      buildPolyfill = buildConfig.polyfill,
      _buildConfig$plugins = buildConfig.plugins,
      buildPluginConfig = _buildConfig$plugins === undefined ? {} : _buildConfig$plugins,
      _buildConfig$resolve = buildConfig.resolve,
      buildResolveConfig = _buildConfig$resolve === undefined ? {} : _buildConfig$resolve,
      _buildConfig$rules = buildConfig.rules,
      buildRulesConfig = _buildConfig$rules === undefined ? {} : _buildConfig$rules,
      _buildConfig$server = buildConfig.server,
      server = _buildConfig$server === undefined ? false : _buildConfig$server,
      otherBuildConfig = _objectWithoutProperties(buildConfig, ['babel', 'entry', 'output', 'polyfill', 'plugins', 'resolve', 'rules', 'server']);

  var userWebpackConfig = userConfig.webpack || {};
  var userOutputConfig = {};
  if ('publicPath' in userWebpackConfig) {
    userOutputConfig.publicPath = userWebpackConfig.publicPath;
  }
  var userResolveConfig = {};
  if (userWebpackConfig.aliases) {
    userResolveConfig.alias = userWebpackConfig.aliases;
  }

  // Generate config for babel-loader and set it as loader config for the build
  buildRulesConfig.babel = { options: (0, _createBabelConfig2.default)(buildBabelConfig, userConfig.babel, userConfig.path) };

  var webpackConfig = _extends({
    module: {
      rules: createRules(server, buildRulesConfig, userWebpackConfig, pluginConfig),
      strictExportPresence: true
    },
    output: _extends({}, buildOutputConfig, userOutputConfig),
    plugins: createPlugins(server, buildPluginConfig, userWebpackConfig),
    resolve: (0, _webpackMerge2.default)({
      extensions: ['.js', '.json']
    }, buildResolveConfig, userResolveConfig),
    resolveLoader: {
      modules: ['node_modules', _path2.default.join(__dirname, '../node_modules')]
    }
  }, otherBuildConfig);

  if (entry) {
    // Add default polyfills to the entry chunk unless configured not to
    if (buildPolyfill !== false && userConfig.polyfill !== false) {
      addPolyfillsToEntry(entry);
    }
    webpackConfig.entry = entry;
  }

  // Create and merge compatibility configuration into the generated config if
  // specified.
  if (userWebpackConfig.compat) {
    var compatConfig = getCompatConfig(userWebpackConfig.compat);
    if (compatConfig) {
      webpackConfig = (0, _webpackMerge2.default)(webpackConfig, compatConfig);
    }
  }

  // Any extra user webpack config is merged into the generated config to give
  // them even more control.
  if (userWebpackConfig.extra) {
    webpackConfig = (0, _webpackMerge2.default)(webpackConfig, userWebpackConfig.extra);
  }

  // Finally, give them a chance to do whatever they want with the generated
  // config.
  if ((0, _utils.typeOf)(userWebpackConfig.config) === 'function') {
    webpackConfig = userWebpackConfig.config(webpackConfig);
    if (!webpackConfig) {
      throw new _errors.UserError(`webpack.config() in ${userConfig.path} didn't return anything - it must return the Webpack config object.`);
    }
  }

  return webpackConfig;
}