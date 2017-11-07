import Echo         from 'laravel-echo';
import IO           from 'socket.io-client';
import Log          from 'loglevel';
import Config       from '../Config';
import Events       from 'assets/js/App/Events';
import ModelHandler from './Events/ModelHandler';
import Token        from './API/Token';

/**
 * This class enables real time communication between the SPA and the server.
 */
export default class WebSocket
{
    constructor()
    {
        /**
         * Laravel Passport access token.
         *
         * @type {string}
         */
        this.token = (new Token).getAccessToken();

        /**
         * The Laravel echo server.
         */
        this.echo = null;

        /**
         * Event subscriptions.
         */
        this.subscriptions = Events;

        // Make the Socket.IO client library global so that it can be accessed by Laravel Echo.
        window.io = IO;
    }

    /**
     * Subscribe the client.
     *
     * @param vue Needed in order to access the root component and use it to fire events.
     * @param {Object} [user] If specified will also subscribe to private channels.
     */
    subscribe(vue, user)
    {
        this.vue = vue;
        this.user = user || null;

        this.connect();

        this.subscriptions.forEach(subscription =>
        {
            subscription.channels.forEach(channel =>
            {
                this.listen(channel, subscription.event);
            });
        });
    }

    /**
     * Subscribe to a channel and listen to an event.
     *
     * @param {string} channel
     * @param {string} event
     */
    listen(channel, event)
    {
        let self = this;

        if (channel === 'App.User')
        {
            let user = this.vue.$store.getters.app.user;

            Log.info('Entering the room: ' + channel + '. Listening to: ' + event + '.');

            this.echo.private(channel + '.' + user.id).listen(event, function (payload)
            {
                self.broadcast(event, payload);
            });
        }
    }

    /**
     * Broadcast an event to all vue components and execute the state mutations needed.
     *
     * @param event
     * @param message
     */
    broadcast(event, message)
    {
        // Fire the event globally using the EventHub
        this.vue.$eh.$emit(event, message);

        this.handleEvent(event, message);

        Log.debug('Broadcasted event ' + event + '.');
    }

    /**
     * Handle an even received from the WebSocket server.
     *
     * @param event
     * @param message
     */
    handleEvent(event, message)
    {
        let subscription = this.subscriptions.find(subscription => subscription.event === event);
        let handlers = subscription.handlers ? subscription.handlers : [];

        // If it's an model related event...
        if (event.startsWith('Models\\')) {
            // ...let it be handled by the model handler.
            handlers.push(new ModelHandler(this.vue));
        }

        handlers.forEach(handler => {
            handler.setVueContext(this.vue).handle(event, message);
        });
    }

    /**
     * Connect to the WebSocket server.
     *
     * @return {WebSocket}
     */
    connect()
    {
        this.echo = new Echo({
            broadcaster: 'socket.io',
            host: Config.webSocket.host + ':' + Config.webSocket.port
        });
        this.echo.connector.options.auth.headers['Authorization'] = `Bearer ` + this.token;

        return this;
    }

    /**
     * Disconnect from the WebSocket server.
     */
    disconnect()
    {
        this.echo.disconnect();
    }
}
