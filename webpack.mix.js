// Load the environment variables.
require('dotenv').config({ path: '.env' });

const webpackConfig = require('spa-skeleton/webpack.config'),
    // merge = require('webpack-merge'),
    mix = require('laravel-mix'),
    fs = require('fs'),
    path = require('path'),
    BuildLocales = require('./src/Library/Mix/Extensions/BuildLocales'),
    VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {

    /**
     * Vendor modules that will be extracted.
     */
    additionalModulesToExtract: [],

    /**
     * Additional Sass files that will be compiled.
     */
    additionalSass: [
        {
            path: 'node_modules/spa-skeleton/src/Assets/Sass/Skeleton.sass',
            file: 'Skeleton.css'
        }
    ],

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
                host: process.env.APP_DOMAIN,
                port: 8080,
            }
        });

        // Load the Configuration from SPA-Skeleton
        mix.webpackConfig(webpackConfig);
        mix.webpackConfig(this.userWebpackConfig);

        // We need to remove the first `ts-loader` defined by Laravel mix since we'll inject our
        // own.
        mix.override((config) => {
            let index = 0;

            while (config.module.rules[index].loader !== 'ts-loader') {
                index++;
            }

            config.module.rules.splice(index, 1);
        });

        mix.extend('buildLocales', new BuildLocales);
        mix.extend('vuetify', new class {
            webpackConfig (config) {
                config.plugins.push(new VuetifyLoaderPlugin)
            }
        });

        mix.buildLocales();
        mix.vuetify();
        this.buildJS();
        this.buildStyles();

        if (process.env.APP_ENV !== 'local') {
            mix.version();
        }

        mix.copy('node_modules/material-design-icons/iconfont', 'public/css');
        mix.copy('node_modules/@mdi/font/fonts', 'public/fonts');
        mix.copy('node_modules/flag-icon-css/flags', 'public/images/flags');

        if (process.env.APP_ENV !== 'production') {
            mix.sourceMaps();
        }
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

        mix.sass('resources/sass/app.sass', 'public/css', {
            // These options are required in order to build the SASS imports in Vuetify components.
            // implementation: require('sass'),
            // sassOptions: {
            //     fiber: require('fibers'),
            //     indentedSyntax: true
            // }
        });

        // mix.options({
        //     processCssUrls: false
        // });

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
