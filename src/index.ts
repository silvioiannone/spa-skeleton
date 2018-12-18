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
import StateMachine from './Library/App/StateMachine';

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

        (new Directives).boot();

        (new Components).boot();

        let store = (new StateMachine).boot()
            .getStore();

        let translator = null;
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
