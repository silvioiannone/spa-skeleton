/* eslint-disable */
const fs = require('fs');
const path = require('path');
const Webpack = require('webpack');
const LaravelMix = require('laravel-mix');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let config = {
    context: __dirname,
    profile: true,
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
                    // Make the current directory the context.
                    // context: __dirname,
                    appendTsSuffixTo: [/\.vue$/],
                    // configFile: path.resolve(__dirname, "tsconfig.json"),
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
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, "./../../tsconfig.json"),
                extensions: {
                    vue: true
                }
            },
        }),
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
        })
    ],
    watchOptions: {
        ignored: /node_modules\/(?!(spa-skeleton)\/).*/
    }
};

// Add the certificates if serving over https.
if (process.env.APP_URL.startsWith('https') && process.argv.includes('--hot')) {
    config.output = {
        publicPath: 'https://' + process.env.APP_DOMAIN + ':8080/',
    };
    config.devServer = {
        // client: {
        //     host: process.env.APP_DOMAIN,
        //     port: 8080
        // },
        public: 'https://' + process.env.APP_DOMAIN + ':8080/',
        https: {
            key: fs.readFileSync(process.env.APP_SSL_KEY),
            cert: fs.readFileSync(process.env.APP_SSL_CERT)
        }
    }
}

module.exports = config;
