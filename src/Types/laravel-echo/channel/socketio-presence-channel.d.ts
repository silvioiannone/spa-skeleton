import { PresenceChannel } from 'spa-skeleton/Definitions/laravel-echo/channel/presence-channel';
import { SocketIoPrivateChannel } from 'spa-skeleton/Definitions/laravel-echo/channel/socketio-private-channel';
/**
 * This class represents a Socket.io presence channel.
 */
export declare class SocketIoPresenceChannel extends SocketIoPrivateChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): SocketIoPresenceChannel;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): SocketIoPresenceChannel;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): SocketIoPresenceChannel;
}
