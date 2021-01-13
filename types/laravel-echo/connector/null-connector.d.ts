import { Connector } from 'spa-skeleton/Definitions/laravel-echo/connector/connector';
import { NullChannel, NullPrivateChannel, PresenceChannel } from 'spa-skeleton/Definitions/laravel-echo/channel';
/**
 * This class creates a null connector.
 */
export declare class NullConnector extends Connector {
    /**
     * All of the subscribed channel names.
     */
    channels: any;
    /**
     * Create a fresh connection.
     */
    connect(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: Function): NullChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): NullChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): NullPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PresenceChannel;
    /**
     * Leave the given channel.
     */
    leave(name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string;
    /**
     * Disconnect the connection.
     */
    disconnect(): void;
}
