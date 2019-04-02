import Service           from './Service';
import GuardHandler      from './ErrorHandler/Guard';
import Guard             from '../Guard';

/**
 * Error handling service.
 */
export default class ErrorHandler extends Service
{
    /**
     * The service name.
     */
    name: string = 'Error handler';

    /**
     * Boot the service.
     */
    boot(): void
    {
        Guard.afterError(response =>
        {
            (new GuardHandler(response)).handle();
        });
    }
}
