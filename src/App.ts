import { Config }  from './Config';
import { Service } from './Library/Services/Service';
import { Logger }  from './Library/Services/Logger';

// Services.
import { Directives }   from './Library/Services/Directives';
import { Components }   from './Library/Services/Components';
import { StateMachine } from './Library/Services/StateMachine';
//import Translator   from './Library/Services/Translator';
import { Plugins }      from './Library/Services/Plugins';
import { Filters }      from './Library/Services/Filters';
import { Validator }    from './Library/Services/Validator';
import { Router }       from './Library/Services/Router';
import { ErrorHandler } from './Library/Services/ErrorHandler';

/**
 * The single page application.
 */
export class App
{
    /**
     * The app's name.
     */
    protected name: string = Config.app.name;

    /**
     * App's mandatory services.
     *
     * These services are booted regardless and are required by the app.
     */
    protected static readonly mandatoryServices: typeof Service[] = [
        Logger
    ];

    /**
     * App's services.
     *
     * Order is important.
     */
    protected static readonly services: typeof Service[] = [
        Directives,
        Components,
        StateMachine,
        Plugins,
        Filters,
        Validator,
        Router,
        ErrorHandler
    ];

    /**
     * Start the application.
     */
    public start(): void
    {
        let t0 = performance.now();

        App.mandatoryServices.forEach((service): Service => App.bootService(service));

        App.prepare();

        Logger.info(`Starting the application...`);

        App.services.forEach((service: typeof Service): void =>
        {
            let instance = App.bootService(service);
            Logger.debug(`Service ${instance.name} booted.`);
        });

        let t1 = performance.now();

        Logger.info('Application started and running.');
        Logger.debug('Application booted in ' + Math.round(t1 - t0) + ' ms.');
    }

    /**
     * Boot a service.
     */
    protected static bootService(service: typeof Service): Service
    {
        let instance = new service;

        instance.boot();

        return instance;
    }

    /**
     * Prepare the app.
     *
     * In here you can import for example the global dependencies and do other initialization stuff.
     */
    protected static prepare(): void
    {
        // Clean the session storage.
        window.sessionStorage.clear();
    }
}
