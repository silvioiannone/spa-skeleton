import Service from './Service';
import _Logger from "loglevel";
import Config  from "spa-skeleton/src/Config";

/**
 * Logger service.
 */
export default class Logger extends Service
{
    /**
     * Service's name.
     */
    name: string = 'Logger';

    /**
     * The logger instance.
     */
    protected static logger: _Logger.Logger;

    /**
     * Boot the service.
     */
    boot(): void
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
    static debug(message: string): void
    {
        this.logger.debug(message);
    }

    /**
     * Write an error message.
     */
    static error(message: string): void
    {
        this.logger.error(message)
    }

    /**
     * Write an info message.
     */
    static info(message: string): void
    {
        this.logger.info(message);
    }
}
