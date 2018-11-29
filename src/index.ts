/// <reference path="./Types/Environment.d.ts"/>
/// <reference path="../../vue/types/index.d.ts"/>
/// <reference path="../../@types/loglevel/index.d.ts"/>

import Log          from 'loglevel';
import Config       from './Config';
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

        let state = (new StateMachine).boot();


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
