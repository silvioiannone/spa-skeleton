import { Service } from './Service';
import _Logger     from 'loglevel';
import { Config }  from '../../Config';

/**
 * Logger service.
 */
export class Logger extends Service
{
    /**
     * Service's name.
     */
    public name: string = 'Logger';

    /**
     * The logger instance.
     */
    protected static logger: _Logger.Logger;

    /**
     * Boot the service.
     */
    public static boot(): void
    {
        if (Logger.logger) {
            return;
        }

        // Initialize the logger.
        _Logger.setLevel(Config.logLevel);

        Logger.logger = _Logger;
    }

    /**
     * Write a debug message.
     */
    public static debug(message: string): void
    {
        this.logger.debug(message);
    }

    /**
     * Write an error message.
     */
    public static error(message: string): void
    {
        this.logger.error(message)
    }

    /**
     * Write an info message.
     */
    public static info(message: string): void
    {
        this.logger.info(message);
    }
}
