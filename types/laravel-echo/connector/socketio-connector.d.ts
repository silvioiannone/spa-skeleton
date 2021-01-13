import { Connector } from 'spa-skeleton/Definitions/laravel-echo/connector/connector';
import { SocketIoChannel, SocketIoPrivateChannel, SocketIoPresenceChannel } from 'spa-skeleton/Definitions/laravel-echo/channel';
/**
 * This class creates a connnector to a Socket.io server.
 */
export declare class SocketIoConnector extends Connector {
    /**
     * The Socket.io connection instance.
     */
    socket: any;
    /**
     * All of the subscribed channel names.
     */
    channels: any;
    /**
     * Create a fresh Socket.io connection.
     */
    connect(): void;
    /**
     * Get socket.io module from global scope or options.
     */
    getSocketIO(): any;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: Function): SocketIoChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): SocketIoChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): SocketIoPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): SocketIoPresenceChannel;
    /**
     * Leave the given channel.
     */
    leave(name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string;
    /**
     * Disconnect Socketio connection.
     */
    disconnect(): void;
}
