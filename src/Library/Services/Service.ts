/**
 * An application service.
 */
export default class Service
{
    /**
     * The service name.
     */
    public name: string = '';

    /**
     * Boot the application service.
     */
    public boot(): void
    {
        throw `Implement the service!`;
    }
}
