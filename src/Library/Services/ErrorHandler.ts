import { Service }               from './Service';
import { Guard as GuardHandler } from './ErrorHandler/Guard';
import { Guard }                 from '../Guard';

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
    public boot(): void
    {
        Guard.afterError((response): void => {
            (new GuardHandler(response)).handle();
        });
    }
}
