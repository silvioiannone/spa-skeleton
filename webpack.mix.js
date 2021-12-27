// Load the environment variables.
require('dotenv').config({ path: '.env' });

const webpackConfig = require('spa-skeleton/webpack.config'),
    // merge = require('webpack-merge'),
    mix = require('laravel-mix'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    BuildLocales = require('./src/Library/Mix/Extensions/BuildLocales');

module.exports = {

    /**
     * Vendor modules that will be extracted.
     */
    additionalModulesToExtract: [],

    /**
     * User defined Webpack config.
     */
    userWebpackConfig: {},

    /**
     * Build.
     */
    build: function ()
    {
        this.init();

        mix.buildLocales();

        mix.copy('node_modules/material-design-icons/iconfont', 'public/css');
        mix.copy('node_modules/@mdi/font/fonts', 'public/fonts');
        mix.copy('node_modules/flag-icons/flags', 'public/images/flags');

        this.buildTS();
        this.buildStyles();

        if (process.env.APP_ENV !== 'local') {
            mix.version();
        }

        if (process.env.APP_ENV !== 'production') {
            mix.sourceMaps();
        }
    },

    /**
     * Initialize.
     *
     * @protected
     */
    init: function ()
    {
        mix.options({
            hmrOptions: {
                host: process.env.APP_DOMAIN,
                port: 8080,
            },
            runtimeChunkPath: 'js',
            // Extract .vue component styling to file, rather than inline.
            extractStyles: true
        });

         mix.override(config => {
            // We need to remove the webpack rule applied to `.tsx?` files defined by Laravel Mix
            // since we'll inject the one defined `webpack.config.js`.
            config.module.rules = config.module.rules.filter(rule => {
                return rule.test.toString() !== /\.tsx?$/.toString();
            });

             // We also need to update the "SASS" and "SCSS" rules defined by laravel in order to
             // make those compatible with Vuetify.
             let sassRule = config.module.rules.find(
                 (rule) => rule.test.toString() === /\.sass$/.toString()
             );

             let sassOneOf = sassRule.oneOf.find((rule) => ! rule.hasOwnProperty('resourceQuery'));
             let sassLoader = sassOneOf.use.find((use) => /sass-loader/.test(use.loader));

             // For SCSS.
             let scssRule = config.module.rules.find(
                 (rule) => rule.test.toString() === /\.scss$/.toString()
             );

             let scssOneOf = scssRule.oneOf.find((rule) => ! rule.hasOwnProperty('resourceQuery'));
             let scssLoader = sassOneOf.use.find((use) => /sass-loader/.test(use.loader));

             [sassLoader, scssLoader].forEach(loader => {
                 loader.options.additionalData = '@import "resources/sass/variables.sass"';
                 loader.options.sassOptions.indentedSyntax = true;
             })
         });

        // Load the Configuration from SPA-Skeleton.
        mix.webpackConfig(webpackConfig);
        mix.webpackConfig(this.userWebpackConfig);

        // Register plugins.
        mix.extend('buildLocales', new BuildLocales);
    },

    /**
     * Extract additional vendor modules.
     *
     * @param {Array<String>} modules
     */
    extract: function (modules)
    {
        this.additionalModulesToExtract = modules;

        return this;
    },

    /**
     * Build TS files.
     *
     * @protected
     */
    buildTS()
    {
        let modulesToExtract = [
            'vue', 'vue-router', 'vuex', 'vuetify', 'vee-validate', 'loglevel', 'moment', 'lodash',
            'raven-js', 'vue-markdown'
        ]
            .concat(this.additionalModulesToExtract);

        mix.ts('resources/ts/App.ts', 'js/app.js')
            .vue({ version: 2 })
            .extract(modulesToExtract, 'js/vendor.js');

        // Build the loader if it exists.
        if (fs.existsSync('resources/ts/Loader.ts')) {
            mix.ts('resources/ts/Loader.ts', './public/js/loader.js');
        }
    },

    /**
     * Build the styles.
     *
     * @protected
     */
    buildStyles()
    {
        let sources = [
            'public/css/app.css',
            'node_modules/vue2-dropzone/dist/vue2Dropzone.min.css',
            'node_modules/material-design-icons/iconfont/material-icons.css',
            'node_modules/@mdi/font/css/materialdesignicons.css',
            'node_modules/github-markdown-css/github-markdown.css'
        ];

        mix.sass('resources/sass/app.sass', 'public/css');
        mix.styles(sources, 'public/css/all.css');

        if (fs.existsSync('resources/ts/Loader.ts')) {
            mix.sass(
                'node_modules/spa-skeleton/src/Assets/Sass/Components/Loader.sass',
                'public/css/loader.css'
            );
        }
    },

    /**
     * Merge the spa-skeleton's Webpack's config with the given config.
     *
     * @param {Object} config
     */
    mergeWebpack: function (config)
    {
        this.userWebpackConfig = config;

        return this;
    },

    /**
     * Compile SASS file.
     *
     * @param {String} sourcePath
     * @param {String} outputPath
     */
    sass: function (sourcePath, outputPath)
    {
        mix.sass(sourcePath, outputPath);
    }
};
