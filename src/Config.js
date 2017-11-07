/**
 * Central client configuration
 */

let appConfig = require('resources/assets/js/Config.js');

const defaultConfig = {

    /**
     * This is the selector that identifies where the app should be attached to
     * the DOM.
     */
    appSelector: '#app',

    /**
     * The application name that should be displayed publicly.
     */
    name: APP_NAME,

    /**
     * This value specifies the environment the application is runnig.
     */
    env: APP_ENV,

    /**
     * Specify what logs to display in the console.
     */
    logLevel: APP_LOG_LEVEL,

    /**
     * The locale that should be used by default.
     */
    locale: 'en',

    /**
     * API settings.
     */
    api:
    {
        /**
         * Base URL that will be used when sending API requests.
         */
        basePath: '/api/',

        /**
         * Shortname of the project.
         */
        subtype: 'be',

        /**
         * API version.
         */
        version: 'v1'
    },

    /**
     * Web client settings.
     */
    client:
    {
        /**
         * OAuth 2 web client ID.
         */
        id: WEB_CLIENT_ID,

        /**
         * OAuth 2 web client secret.
         */
        secret: WEB_CLIENT_SECRET
    },

    /**
     * Maps settings.
     */
    maps:
    {
        /**
         * Google Maps API key.
         */
        apiKey: GOOGLE_API_KEY
    },

    /**
     * Router settings.
     *
     * These settings change the way the router (in this case vue-router)
     * behaves.
     */
    router:
    {
        /**
         * This option allows you to set the router mode.
         */
        mode: 'history',

        /**
         * Class that will be applied to the elements holding the 'v-link' or
         * 'v-link-active' directive.
         */
        linkActiveClass: 'active',
    },

    /**
     * WebSocket settings.
     */
    webSocket:
    {
        /**
         * Host where the WebSocket server is hosted.
         */
        host: WEBSOCKET_SERVER_HOST,

        /**
         * WebSocket server port.
         */
        port: WEBSOCKET_SERVER_PORT,

        /**
         * WebSocket server app ID.
         */
        app_id: WEBSOCKET_SERVER_APP_ID,

        /**
         * WebSocket server auth key.
         */
        key: WEBSOCKET_SERVER_KEY
    },

    /**
     * Sentry error reporting tool.
     */
    sentry:
    {
        /**
         * Sentry DSN.
         */
        dsn: SENTRY_DSN_JS
    }
}

appConfig = Object.assign(defaultConfig, appConfig);

export default appConfig;
