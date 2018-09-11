const config = require('spa-skeleton/webpack.config');
const merge = require('webpack-merge');
const path = require('path');

module.exports = {

    /**
     * Vendor modules that will be extracted.
     */
    additionalModulesToExtract: [],

    /**
     * Additional Sass files that will be compiled.
     */
    additionalSass: [],

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
     *
     * @param mix
     */
    build: function (mix)
    {
        this.mix = mix;

        // Load the Configuration from SPA-Skeleton
        mix.webpackConfig(merge(config, this.userWebpackConfig));

        this.buildJS();
        this.buildStyles();

        if (process.env.APP_ENV !== 'local') {
            mix.version();
        }

        mix.copy('node_modules/material-design-icons/iconfont', 'public/css');
        mix.copy('node_modules/mdi/fonts', 'public/fonts');

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
            'vue',
            'vue-router',
            'vuex',
            'vuetify',
            'vee-validate',
            'loglevel',
            'moment',
            'lodash',
            'raven-js',
            'vue-markdown'
        ].concat(this.additionalModulesToExtract);

        this.mix.js('resources/js/App.js', './public/js/app.js')
            .extract(modulesToExtract, './public/js/vendor.js');
    },

    /**
     * Build the styles.
     *
     * @protected
     */
    buildStyles()
    {
        let self = this;
        let sources = [
            'node_modules/material-design-icons/iconfont/material-icons.css',
            'node_modules/mdi/css/materialdesignicons.css',
            'node_modules/github-markdown-css/github-markdown.css',
            'public/css/app.css'
        ];

        this.mix.stylus('resources/stylus/app.styl', 'public/css');

        if (this.additionalSass.length) {
            this.additionalSass.forEach(function (sassSource)
            {
                self.mix.sass(sassSource.path, 'public/css');
                sources.unshift('public/css/' + sassSource.file);
            });
        }

        this.mix.styles(sources, 'public/css/all.css');
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
