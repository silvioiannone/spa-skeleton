/* eslint-disable */
const fs = require('fs');
const path = require('path');
const Webpack = require('webpack');
const { VuetifyLoaderPlugin } = require('vuetify-loader')

let config = {
    context: __dirname,
    profile: true,
    output: {
        // Output the JS chunks in the `js` folder.
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        alias: {
            'spa-skeleton$': path.resolve(__dirname, 'index.ts')
        },
        modules: [
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                    appendTsSuffixTo: [/\.vue$/],
                    // Use this option together with `ForkTsCheckerWebpackPlugin` to get full type
                    // checking.
                    transpileOnly: true,
                    // Allow compilation of TS files in the `node_modules` directory.
                    allowTsInNodeModules: true
                }
            }
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.APP_ENV),
            APP_LOG_LEVEL: JSON.stringify(process.env.APP_LOG_LEVEL),
            APP_NAME: JSON.stringify(process.env.APP_NAME),
            APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
            APP_URL: JSON.stringify(process.env.APP_URL),
            MAIL_SUPPORT_ADDRESS: JSON.stringify(process.env.MAIL_SUPPORT_ADDRESS),
            PAGINATION_DEFAULT_SIZE: JSON.stringify(process.env.PAGINATION_DEFAULT_SIZE),
            SENTRY_DSN_JS: JSON.stringify(process.env.SENTRY_DSN_JS),
            WEBSOCKET_SERVER_HOST: JSON.stringify(process.env.WEBSOCKET_SERVER_HOST),
            WEBSOCKET_SERVER_PORT: JSON.stringify(process.env.WEBSOCKET_SERVER_PORT),
            WEBSOCKET_SERVER_APP_ID: JSON.stringify(process.env.WEBSOCKET_SERVER_APP_ID),
            WEBSOCKET_SERVER_KEY: JSON.stringify(process.env.WEBSOCKET_SERVER_KEY),
            WEB_CLIENT_ID: JSON.stringify(process.env.WEB_CLIENT_ID),
            WEB_CLIENT_SECRET: JSON.stringify(process.env.WEB_CLIENT_SECRET),
        }),
        new VuetifyLoaderPlugin()
    ],
    watchOptions: {
        // Ignore all the files in the `node_modules` folder except the ones in the `spa-skeleton`.
        ignored: /node_modules\/(?!(spa-skeleton)\/).*/,
    }
};

// Additional configuration if hot reloading over HTTPS.
if (process.env.APP_URL.startsWith('https') && process.argv.includes('--hot')) {
    config.output = {
        publicPath: 'https://' + process.env.APP_DOMAIN + ':8080/',
    };
    config.devServer = {
        https: {
            key: fs.readFileSync(process.env.APP_SSL_KEY),
            cert: fs.readFileSync(process.env.APP_SSL_CERT)
        }
    };
    // Override Laravel Mix's `http()` function in HotReloading. We need to override this
    // function because by default Laravel Mix looks at the presence of the `--https` cli
    // option. This causes the webpack dev server to create its own certificates and to ignore
    // the ones defined in the `devServer` Webpack config.
    process.argv.push(
        '--https',
        '--key ' + process.env.APP_SSL_KEY,
        '--cert ' + process.env.APP_SSL_CERT
    );
}

module.exports = config;
