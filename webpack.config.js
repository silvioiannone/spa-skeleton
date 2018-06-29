const path = require('path'),
      nodeEnvFile = require('node-env-file'),
      webpack = require('webpack'),
      mix = require('laravel-mix');

nodeEnvFile('./.env');

let chunkFilename = (process.env.APP_ENV === 'local') ? 'js/[name].js' : 'js/[name].[chunkhash].js';

module.exports = {
    resolve: {
        modules: [
            path.resolve('./resources'),
            path.resolve('./node_modules')
        ]
    },
    output: {
        chunkFilename
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(spa-skeleton)\/).*/,
                use: [{
                    loader: 'babel-loader',
                    options: mix.config.babel()
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(process.env.APP_ENV),
            APP_LOG_LEVEL: JSON.stringify(process.env.APP_LOG_LEVEL),
            APP_NAME: JSON.stringify(process.env.APP_NAME),
            APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
            APP_MAIL_SUPPORT_ADDRESS: JSON.stringify(process.env.MAIL_SUPPORT_ADDRESS),
            APP_URL: JSON.stringify(process.env.APP_URL),
            PAGINATION_DEFAULT_SIZE: JSON.stringify(process.env.PAGINATION_DEFAULT_SIZE),
            GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
            SENTRY_DSN_JS: JSON.stringify(process.env.SENTRY_DSN_JS),
            WEBSOCKET_SERVER_HOST: JSON.stringify(process.env.WEBSOCKET_SERVER_HOST),
            WEBSOCKET_SERVER_PORT: JSON.stringify(process.env.WEBSOCKET_SERVER_PORT),
            WEBSOCKET_SERVER_APP_ID: JSON.stringify(process.env.WEBSOCKET_SERVER_APP_ID),
            WEBSOCKET_SERVER_KEY: JSON.stringify(process.env.WEBSOCKET_SERVER_KEY),
            WEB_CLIENT_ID: JSON.stringify(process.env.WEB_CLIENT_ID),
            WEB_CLIENT_SECRET: JSON.stringify(process.env.WEB_CLIENT_SECRET),
        })
    ]
};
