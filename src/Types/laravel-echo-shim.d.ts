declare module 'laravel-echo'
{
    import Echo from 'spa-skeleton/src/Types/laravel-echo/echo';

    export { Channel } from 'spa-skeleton/src/Types/laravel-echo/channel/channel';
    export { SocketIoConnector } from 'spa-skeleton/src/Types/laravel-echo/connector/socketio-connector';

    export default Echo;
}
