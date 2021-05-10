import { Service }               from './Service';
import { Config }                from '../../Config';
import { Guard as GuardHandler } from './ErrorHandler/Guard';
import { Guard }                 from '../Guard';
import Bugsnag                   from '@bugsnag/js';
import BugsnagPluginVue          from '@bugsnag/plugin-vue';

/**
 * Error handling service.
 */
export class ErrorHandler extends Service
{
    /**
     * The service name.
     */
    public name: string = 'Error handler';

    /**
     * Boot the service.
     */
    public static boot(): void
    {
        if (Config.env === 'production') {
            Bugsnag.start({
                apiKey: Config.app.services.errorHandler.key,
                plugins: [new BugsnagPluginVue()]
            });
        }

        Guard.afterError((response): void => {
            (new GuardHandler(response)).handle();
        });
    }
}
