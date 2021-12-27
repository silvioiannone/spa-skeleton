/**
 * An application service.
 */
export class Service
{
    /**
     * The service name.
     */
    public name: string = '';

    /**
     * Boot the application service.
     */
    public static async boot(): Promise<void>
    {
    }

    /**
     * Perform in here all the necessary operations to register the service with the application.
     *
     * At this point the other services are not available yet.
     */
    public static register(): void
    {
    }
}
