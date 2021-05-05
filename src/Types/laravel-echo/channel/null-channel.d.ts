import { Channel } from 'spa-skeleton/Definitions/laravel-echo/channel/channel';
/**
 * This class represents a null channel.
 */
export declare class NullChannel extends Channel {
    /**
     * Subscribe to a channel.
     */
    subscribe(): any;
    /**
     * Unsubscribe from a channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: Function): NullChannel;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string): NullChannel;
    /**
     * Bind a channel to an event.
     */
    on(event: string, callback: Function): NullChannel;
}
