import Echo from 'laravel-echo';
import IO  from 'socket.io-client';
import Log from 'loglevel';
import Config from '../Config';
import Subscriptions from 'assets/js/App/Subscriptions';
import UserChannel from './WebSocket/Channels/User';
import ModelHandler from './Events/ModelHandler';
import Token from './API/Token';

/**
 * This class enables real time communication between the SPA and the server.
 */
export default class WebSocket
{
    constructor()
    {
        /**
         * The Skeleton's subscriptions.
         *
         * @type {[]}
         */
        this.skeletonSubscriptions = [
            {
                event: '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent',
                channels: [UserChannel],
            }
        ];

        /**
         * The Laravel echo server.
         */
        this.echo = null;

        /**
         * Event subscriptions.
         */
        this.subscriptions = [];

        /**
         * List of current subscriptions.
         */
        this.currentSubscriptions = [];

        // Make the Socket.IO client library global so that it can be accessed by Laravel Echo.
        window.io = IO;

        this.subscriptions = this.subscriptions.concat(Subscriptions);
    }

    /**
     * Subscribe the client.
     *
     * @param vue Needed in order to access the root component and use it to fire events.
     */
    subscribe(vue)
    {
        this.vue = vue;

        this.connect();

        let subscriptions = []
            .concat(this.subscriptions)
            .concat(this.skeletonSubscriptions);

        subscriptions.forEach(subscription => this.listen(subscription));
    }

    /**
     * Subscribe to a channel and listen to an event.
     *
     * @param {object} subscription
     */
    listen(subscription)
    {
        if (this.currentSubscriptions.indexOf(subscription) >= 0) return;

        let self = this;
        let event = subscription.event;

        subscription.channels.forEach(channel =>
        {
            let channelInstance = new channel(this.vue.$store);

            Log.info('Listening to: ' + event + ' in the room ' + channelInstance.name() + '.');

            this.echo
                .private(channelInstance.name())
                .listen(event, function (payload)
                {
                    if (event === '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent') {
                        self.handleNotification(payload.response);
                    } else {
                        self.broadcast(event, payload);
                    }
                });
        });

        // Add the subscription to the current subscriptions.
        this.currentSubscriptions = this.currentSubscriptions.concat(subscription);
    }

    /**
     * Add an additional subscription that will be processed as soon as the connection to the WS socket is established.
     *
     * The format of the subscription is the following:
     *     {
     *         event: {String},
     *         channels: {Array}
     *     }
     *
     * @param {Object} subscription
     */
    listenTo(subscription)
    {
        if (! this.echo) {
            this.subscriptions.push(subscription);
            return;
        }

        this.listen(subscription);
    }

    /**
     * Leave a channel.
     *
     * @param {AbstractChannel} channel
     */
    leave(channel)
    {
        let channelInstance = new channel(this.vue.$store);

        this.currentSubscriptions.forEach(subscription =>
        {
            let index = subscription.channels.findIndex(channel =>
            {
                let currentChannel = new channel(this.vue.$store);
                return currentChannel.name() === channelInstance.name();
            });

            if (index >= 0) {
                subscription.channels.splice(index, 1);
            }
        });

        this.echo.leave(channelInstance.name());
        Log.debug('Channel ' + channelInstance.name() + ' left.');
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
     * Handle a notification.
     *
     * @param notification
     */
    handleNotification(notification)
    {
        this.vue.$store.commit('notifications/ADD', {data: notification});

        Log.debug('Notification received: ' + notification.type + '.');
    }

    /**
     * Handle an event received from the WebSocket server.
     *
     * @param event
     * @param message
     */
    handleEvent(event, message)
    {
        let subscription = this.subscriptions.find(subscription => subscription.event === event);
        let handlers = (subscription && subscription.handlers) ? subscription.handlers : [];

        // If it's a model related event...
        if (event.startsWith('Models.') || event.indexOf('App\\Events\\Models') >= 0) {
            // ...let it be handled by the model handler.
            handlers.push(new ModelHandler(this.vue));
        }

        handlers.forEach(handler => {
            handler.handle(event, message);
        });
    }

    /**
     * Connect to the WebSocket server.
     *
     * @return {WebSocket}
     */
    connect()
    {
        if (this.echo) return;

        this.echo = new Echo({
            broadcaster: 'socket.io',
            host: Config.webSocket.host + ':' + Config.webSocket.port
        });
        this.echo.connector.options.auth.headers['Authorization'] = `Bearer ` + (new Token).getAccessToken();
        this.echo.connector.socket._callbacks.$connect.push(() =>
        {
            // Set the socket ID in the API
            this.vue.$api.setSocketId(this.echo.socketId());
            Log.debug('Connected to the WebSocket server (ID: ' + this.echo.socketId() + ')');
        });

        return this;
    }

    /**
     * Disconnect from the WebSocket server.
     */
    disconnect()
    {
        if (this.echo) {
            this.echo.disconnect();
            this.echo = null;
        }
    }
}
