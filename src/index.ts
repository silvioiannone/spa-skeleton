/// <reference path="./Definitions/Environment.d.ts"/>
/// <reference path="../../vue/types/index.d.ts"/>
/// <reference path="../../vue-router/types/index.d.ts"/>
/// <reference path="../../@types/jwt-decode/index.d.ts"/>
/// <reference path="../../@types/loglevel/index.d.ts"/>
/// <reference path="../../@types/socket.io-client/index.d.ts"/>
/// <reference path="../../@types/vue-markdown/index.d.ts"/>

import Log          from 'loglevel';
import Config       from './Config';
import Components   from './Library/App/Components';
import Directives   from './Library/App/Directives';
import Filters      from './Library/App/Filters';
import Plugins      from './Library/App/Plugins';
import Router       from './Library/App/Router';
import StateMachine from './Library/App/StateMachine';
import Translator   from './Library/App/Translator';
import Validator    from './Library/App/Validator';
import VueI18N      from 'vue-i18n';

/**
 * SPA Skeleton entry point.
 */
export default class Main
{
    /**
     * Start the application.
     */
    public boot(): void
    {
        let t0 = performance.now();

        this.prepare();

        Log.info('Starting app...');

        // Register the custom directives
        (new Directives).boot();

        // Init the global components
        (new Components).boot();

        // Init the state machine.
        let store = (new StateMachine).boot()
            .getStore();

        let translator = new Translator;

        // Init the plugins.
        (new Plugins)
            .before('Vuetify', () =>
            {
                let translatorInstance = translator
                    .boot()
                    .get();

                return {
                    lang: {
                        t: (key: string, ...params: any) => translatorInstance.t(key, params)
                    }
                }
            })
            .boot();

        // Init the filters.
        (new Filters(store)).boot();

        // Init the validator.
        (new Validator(translator)).boot();

        // Init the router.
        (new Router)
            .setTranslator(translator)
            .boot(store);

        let t1 = performance.now();

        Log.info('App started and running.');
        Log.debug('App booted in ' + Math.round(t1 - t0) + ' ms.');
    }

    /**
     * Prepare the app.
     *
     * In here you can import for example the global dependencies and do other initialization stuff.
     */
    protected prepare()
    {
        // Initialize the logger.
        Log.setLevel(Config.logLevel);

        // Clean the session storage.
        window.sessionStorage.clear();
    }
}
