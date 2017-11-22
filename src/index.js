import Log from 'loglevel';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Vue from 'vue';
import Config from './Config';
import Components from './Library/App/Components';
import Directives from './Library/App/Directives';
import Filters from './Library/App/Filters';
import Plugins from './Library/App/Plugins';
import Router from './Library/App/Router';
import StateMachine from './Library/App/StateMachine';
import Translator from './Library/App/Translator';
import Validator from './Library/App/Validator';

export default class Main
{

    constructor ()
    {
        /**
         * @private
         */
        this.vue = Vue;
    }

    /**
     * Start the application.
     */
    boot ()
    {
        let t0 = performance.now();
        Log.info('Starting app...');

        this.prepare();

        // Register the custom directives
        (new Directives(this.vue)).boot();

        // Init the state machine
        let state = (new StateMachine(this.vue)).boot();

        // Init the validator
        (new Validator(this.vue)).boot();

        // Init the filters
        (new Filters(this.vue)).boot();

        // Init the global components
        (new Components(this.vue)).boot();

        // Init the plugins
        (new Plugins(this.vue)).boot();

        // Init the translator
        let translator = (new Translator).boot();

        // Init the router
        (new Router(this.vue))
            .translator(translator)
            .boot(state.getStore());

        let t1 = performance.now();
        Log.info('App started and running.');
        Log.debug('App booted in ' + Math.round(t1 - t0) + ' ms.');
    }

    /**
     * Prepare the app.
     *
     * In here you can import for example the global dependencies and do other
     * initialization stuff.
     *
     * @private
     */
    prepare ()
    {
        // Initiate the error reporting tool
        if (Config.env !== 'local') {
            Raven.config(Config.sentry.dsn)
                .addPlugin(RavenVue, Vue)
                .install();
        }

        // Initialize the logger
        let logLevel = Config.logLevel;
        Log.setLevel(logLevel);

        // Clean the session storage.
        window.sessionStorage.clear();
    }
}
