import { Channel, PresenceChannel } from 'spa-skeleton/src/Types/laravel-echo/channel';

export declare abstract class Connector {
    /**
     * Default connector options.
     */
    private _defaultOptions;
    /**
     * Connector options.
     */
    options: any;
    /**
     * Create a new class instance.
     */
    constructor(options: any);
    /**
     * Merge the custom options with the defaults.
     */
    protected setOptions(options: any): any;
    /**
     * Extract the CSRF token from the page.
     */
    protected csrfToken(): string;
    /**
     * Create a fresh connection.
     */
    abstract connect(): void;
    /**
     * Get a channel instance by name.
     */
    abstract channel(channel: string): Channel;
    /**
     * Get a private channel instance by name.
     */
    abstract privateChannel(channel: string): Channel;
    /**
     * Get a presence channel instance by name.
     */
    abstract presenceChannel(channel: string): PresenceChannel;
    /**
     * Leave the given channel.
     */
    abstract leave(channel: string): void;
    /**
     * Get the socket_id of the connection.
     */
    abstract socketId(): string;
    /**
     * Disconnect from the Echo server.
     */
    abstract disconnect(): void;
}
