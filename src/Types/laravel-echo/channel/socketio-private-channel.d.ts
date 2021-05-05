import { SocketIoChannel } from 'spa-skeleton/Definitions/laravel-echo/channel/socketio-channel';
/**
 * This class represents a Socket.io presence channel.
 */
export declare class SocketIoPrivateChannel extends SocketIoChannel {
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName: string, data: any): SocketIoChannel;
}
