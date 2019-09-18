/* eslint-disable */

const config = require('spa-skeleton/webpack.config'),
    fs = require('fs'),
    merge = require('webpack-merge'),
    mix = require('laravel-mix'),
    path = require('path'),
    BuildLocales = require('./src/Library/Mix/Extensions/BuildLocales');

module.exports = {

    /**
     * Vendor modules that will be extracted.
     */
    additionalModulesToExtract: [],

    /**
     * Laravel mix.
     */
    mix: null,

    /**
     * User defined Webpack config.
     */
    userWebpackConfig: {},

    /**
     * Build.
     */
    build: function ()
    {
        mix.options({
            hmrOptions: {
                host: '0.0.0.0',
                port: 8081
            }
        });

        this.mix = mix;

        // Load the Configuration from SPA-Skeleton
        mix.webpackConfig(merge(config, this.userWebpackConfig));

        mix.extend('buildLocales', new BuildLocales);

        mix.buildLocales();
        this.buildJS();
        this.buildStyles();

        if (process.env.APP_ENV !== 'local') {
            mix.version();
        }

        if (process.env.APP_ENV !== 'production') {
            mix.sourceMaps();
        }

        mix.copy('node_modules/material-design-icons/iconfont', 'public/css');
        mix.copy('node_modules/@mdi/font/fonts', 'public/fonts');
        mix.copy('node_modules/flag-icon-css/flags', 'public/images/flags');
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
     * Build JS files.
     *
     * @protected
     */
    buildJS()
    {
        let modulesToExtract = [
            'vue',
            'vue-router',
            'vuex',
            'vuetify',
            'vee-validate',
            'loglevel',
            'moment',
            'lodash',
            'vue-markdown'
        ].concat(this.additionalModulesToExtract);

        this.mix.js('resources/ts/App.ts', './public/js/app.js')
            .extract(modulesToExtract, './public/js/vendor.js');

        // Build the loader if it exists.
        if (fs.existsSync('resources/ts/Loader.ts')) {
            this.mix.js('resources/ts/Loader.ts', './public/js/loader.js');
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
            'node_modules/vue2-dropzone/dist/vue2Dropzone.css',
            'node_modules/material-design-icons/iconfont/material-icons.css',
            'node_modules/@mdi/font/css/materialdesignicons.css',
            'node_modules/github-markdown-css/github-markdown.css',
            'public/css/app.css'
        ];

        this.mix.sass('resources/sass/app.sass', 'public/css', {
            // These options are required in order to build the SASS imports in Vuetify components.
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true
        });

        this.mix.options({
            processCssUrls: false
        })

        this.mix.styles(sources, 'public/css/all.css');

        if (fs.existsSync('resources/ts/Loader.ts')) {
            this.mix.sass(
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
     * Include an additional SASS file.
     *
     * @param {String} sourcePath
     */
    sass: function (sourcePath)
    {
        this.additionalSass.push({
            // Location of the source file
            path: sourcePath,
            // Name of the output file
            file: path.basename(sourcePath, path.extname(sourcePath)) + '.css'
        });

        return this;
    }
};
