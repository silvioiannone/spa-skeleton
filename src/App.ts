import State from '../../../resources/ts/App/State';
import { Config }  from './Config';
import { Service } from './Library/Services/Service';
import { Logger }  from './Library/Services/Logger';

// Services.
import { Directives }   from './Library/Services/Directives';
import { Components }   from './Library/Services/Components';
import { StateMachine } from './Library/Services/StateMachine';
import { Translator }   from './Library/Services/Translator';
import { Plugins }      from './Library/Services/Plugins';
import { Filters }      from './Library/Services/Filters';
import { Validator }    from './Library/Services/Validator';
import { Router }       from './Library/Services/Router';
import { ErrorHandler } from './Library/Services/ErrorHandler';
import { Time }         from './Library/Services/Time';

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
     * Functions that will be executed after the services have been initialized.
     */
    protected static bootCallbacks: Function[] = [];

    /**
     * App's services.
     *
     * Order is important.
     */
    protected static readonly services: typeof Service[] = [
        Logger,
        Directives,
        Components,
        StateMachine,
        Plugins,
        Filters,
        Translator,
        Validator,
        Router,
        ErrorHandler,
        Time
    ];

    /**
     * Start the application.
     */
    public start(): void
    {
        let t0 = performance.now();

        App.prepare();

        // Register the services.
        App.services.forEach(async (service: typeof Service): Promise<void> => {
            service.register();
        });

        Logger.info(`Starting the application...`);

        // Boot the services.
        App.services.forEach(async (service: typeof Service): Promise<void> => {
            await App.bootService(service);
            Logger.debug(`Service ${service.name} booted.`);
        });

        Logger.debug('Services booted.');
        Logger.debug('Running boot callbacks...');

        App.bootCallbacks.forEach((callback: Function): void => callback());

        Logger.debug('Boot callbacks executed.');

        let t1 = performance.now();

        Logger.debug('Application booted in ' + Math.round(t1 - t0) + ' ms.');

        this.conclude();
    }

    /**
     * Register a callback that will be executed after the services have been booted.
     */
    public static boot(callback: Function): typeof App
    {
        this.bootCallbacks.push(callback);

        return App;
    }

    /**
     * Boot a service.
     */
    protected static async bootService(service: typeof Service): Promise<void>
    {
        await service.boot();
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

    /**
     * Conclude the app's initialization.
     */
    protected conclude(): void
    {
        window.dispatchEvent(new Event('appLoaded'));

        Logger.info('Application started and running.');
    }
}
