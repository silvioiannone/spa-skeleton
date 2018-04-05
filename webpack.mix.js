const config = require('spa-skeleton/webpack.config');

module.exports = {

    /**
     * Extract additional vendor modules.
     *
     * @param {Array<String>} modules
     */
    extract: function(modules)
    {
        this.additionalModulesToExtract = modules;

        return this;
    },

    /**
     * Build.
     *
     * @param mix
     */
    build: function (mix)
    {
        // Load the Configuration from SPA-Skeleton
        mix.webpackConfig(config);

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

        mix.js('resources/assets/js/App.js', './public/js/app.js')
            .extract(modulesToExtract, './public/js/vendor.js');

        mix.stylus('resources/assets/stylus/app.styl', 'public/css');

        mix.styles([
            'node_modules/material-design-icons/iconfont/material-icons.css',
            'node_modules/mdi/css/materialdesignicons.css',
            'node_modules/github-markdown-css/github-markdown.css',
            'public/css/app.css'
        ], 'public/css/all.css');

        if (process.env.APP_ENV !== 'local') {
            mix.version();
        }

        mix.copy('node_modules/material-design-icons/iconfont', 'public/css');
        mix.copy('node_modules/mdi/fonts', 'public/fonts');

        if (process.env.APP_ENV !== 'production') {
            mix.sourceMaps();
        }
    }
};
