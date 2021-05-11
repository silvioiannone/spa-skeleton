import Vue from 'vue';
import { Service }                   from './Service';
import { Config }                    from '../../Config';
import { Guard as GuardHandler }     from './ErrorHandler/Guard';
import { Guard }                     from '../Guard';
import { StateMachine }              from './StateMachine';
import BugsnagPluginVue              from '@bugsnag/plugin-vue';
import { Event, default as Bugsnag } from '@bugsnag/js'

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
        Guard.afterError((response): void => {
            (new GuardHandler(response)).handle();
        });

        this.registerReporter();
    }

    /**
     * Register the error reporer.
     */
    public static registerReporter(): void
    {
        if (! Config.app.services.errorHandler.key) {
            return;
        }

        const bugsnag = Bugsnag.start({
            apiKey: Config.app.services.errorHandler.key,
            plugins: [new BugsnagPluginVue()],
            onError: (event: Event) => {
                event.addMetadata('user', {
                    user: StateMachine.getStore().getters?.app?.user
                });
            }
        });

        bugsnag.getPlugin('vue')
            ?.installVueErrorHandler(Vue);
    }
}
