import _ from 'lodash';

// App configuration.
import AppConfig from '../../../resources/ts/Config';

// API drivers.
import { SuperAgentDriver } from './Library/Api/Drivers/SuperAgentDriver';
import { AxiosDriver }      from './Library/Api/Drivers/AxiosDriver';

const defaultConfig = {

    /**
     * This is the selector that identifies where the app should be attached to the DOM.
     */
    appSelector: '#app',

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
     * App specific settings.
     */
    app: {

        /**
         * The application name that should be displayed publicly.
         */
        name: APP_NAME,

        /**
         * Pagination size.
         */
        paginationSize: parseInt(PAGINATION_DEFAULT_SIZE),

        /**
         * E-mail address to contact in case of need.
         */
        support: MAIL_SUPPORT_ADDRESS,

        /**
         * Services settings.
         */
        services: {

            /**
             * Router settings.
             *
             * These settings change the way the router (in this case vue-router) behaves.
             */
            router: {

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
             * Translator settings.
             */
            translator: {

                /**
                 * Hide the translator warnings.
                 */
                hideWarnings: false
            }
        },

        /**
         * System settings.
         */
        system: {

            /**
             * Date and time settings.
             */
            dateAndTime: {

                /**
                 * Date format.
                 *
                 * Formatting help: https://momentjs.com/docs/#/displaying/format/
                 */
                dateFormat: 'Do MMMM YYYY'
            }
        }
    },

    /**
     * API settings.
     */
    api: {

        /**
         * Default API driver.
         *
         * Must match one of the keys in `api.drivers`.
         */
        driver: 'superAgent',

        /**
         * Available API drivers.
         */
        drivers: {
            axios:      AxiosDriver,
            superAgent: SuperAgentDriver
        },

        /**
         * Base URL that will be used when sending API requests.
         */
        basePath: '/api/v1/'
    },

    /**
     * Web client settings.
     */
    client: {

        /**
         * Laravel Passport web client ID.
         */
        id: WEB_CLIENT_ID,

        /**
         * Laravel Passport web client secret.
         */
        secret: WEB_CLIENT_SECRET
    },

    /**
     * WebSocket settings.
     */
    webSocket: {

        /**
         * Whether to connect to the WS server.
         */
        enabled: true,

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
    sentry: {

        /**
         * Sentry DSN.
         */
        dsn: SENTRY_DSN_JS
    },

    /**
     * UI settings.
     */
    ui: {

        /**
         * Components settings.
         */
        components: {

            /**
             * Card component settings.
             */
            card: {

                /**
                 * The default style that the component should use.
                 */
                defaultStyle: null,
            },

            /**
             * Text field component settings.
             */
            textField: {

                /**
                 * The default style that the component should use.
                 */
                defaultStyle: null,
            },

            /**
             * Textarea component settings.
             */
            textarea: {

                /**
                 * The default style that the component shoud use.
                 */
                defaultStyle: null
            }
        },

        /**
         * UI colors.
         */
        colors: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
        }
    }
};

let Config: any = _.merge(defaultConfig, AppConfig);

export { Config };
