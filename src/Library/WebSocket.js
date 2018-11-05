import Echo from 'laravel-echo';
import IO  from 'socket.io-client';
import Log from 'loglevel';
import Config from '../Config';
import Subscriptions from 'js/App/Subscriptions';
import AdminChannel from './WebSocket/Channels/Admin';
import AppChannel from './WebSocket/Channels/App';
import UserChannel from './WebSocket/Channels/User';
import AppHandler from './Events/AppHandler';
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
                event: 'Models.UserUpdated',
                channels: [AdminChannel, UserChannel],
                handlers: {AppHandler}
            },
            {
                event: '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent',
                channels: [UserChannel],
            },
            {
                event: '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\SettingsUpdated',
                channels: [AppChannel],
                handlers: {AppHandler}
            }
        ];

        /**
         * The Laravel echo server.
         */
        this.echo = null;

        /**
         * Pending subscriptions.
         */
        this.pendingSubscriptions = [];

        /**
         * List of active subscriptions.
         */
        this.activeSubscriptions = [];

        // Make the Socket.IO client library global so that it can be accessed by Laravel Echo.
        window.io = IO;
    }

    /**
     * Subscribe the client.
     *
     * @param vue Needed in order to access the root component and use it to fire events.
     */
    subscribe(vue)
    {
        this.vue = vue;

        if(! Config.webSocket.enabled) {
            return;
        }

        this.connect();

        let subscriptions = this.skeletonSubscriptions
            .concat(Subscriptions)
            .concat(this.pendingSubscriptions);

        this.listen(subscriptions);
    }

    /**
     * Subscribe to a channel and listen to an event.
     *
     * @param {Array} subscriptions
     */
    listen(subscriptions)
    {
        if (! this.echo) {
            this.pendingSubscriptions = this.pendingSubscriptions.concat(subscriptions);
            return;
        }

        subscriptions.forEach(subscription =>
        {
            if (this.activeSubscriptions.indexOf(subscription) >= 0) return;

            // TODO: add the subscription to the list of the active subscriptions only if the
            // joining was successful (use a promise).
            subscription.channels.forEach(channel => this.join(channel, subscription.event));

            // Add the subscription to the active subscriptions.
            this.activeSubscriptions = this.activeSubscriptions.concat(subscription);
        });
    }

    /**
     * Remove the subscriptions.
     *
     * @param subscriptions
     */
    silence(subscriptions)
    {
        subscriptions.forEach(subscription =>
        {
            let index = this.activeSubscriptions.indexOf(subscription);
            this.activeSubscriptions.splice(index, 1);

            subscription.channels.forEach(channel =>
            {
                let channelName = this.makeChannel(channel).name();

                Log.info('No longer listening to ' + subscription.event + ' in the ' + channelName
                    + ' room.');

                this.leaveChannelIfUnused(channel);
            });
        });
    }

    /**
     * Leave a channel if it's not used by any event.
     *
     * @param {String} channel
     */
    leaveChannelIfUnused(channel)
    {
        let channelName = this.makeChannel(channel).name();
        let channelInUse = false;
        this.activeSubscriptions.forEach(subscription =>
        {
            if (channelInUse) {
                return;
            }

            let found = subscription.channels
                .find(channel => this.makeChannel(channel).name() === channelName);

            if (found) {
                channelInUse = true;
            }
        });

        if (! channelInUse) {
            this.echo.leave(channelName);
            Log.debug('Channel ' + channelName + ' left.');
        }
    }

    /**
     * Listen for an event on a channel.
     *
     * @param {} channel
     * @param {} event
     * @protected
     */
    join(channel, event)
    {
        let self = this;
        let channelInstance = this.makeChannel(channel);
        let echo = this.echo;

        if (! channelInstance.canEnter()) {
            return;
        }

        Log.info('Listening to ' + event + ' in the ' + channelInstance.name() + ' room.');

        if (channelInstance.isPrivate()) {
            echo = echo.private(channelInstance.name());
        } else {
            echo = echo.channel(channelInstance.name());
        }

        echo.listen(event, payload =>
        {
            if (event === '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent') {
                self.handleNotification(payload.response);
            } else {
                self.broadcast(event, payload);
            }
        });
    }

    /**
     * Make a channel instance.
     *
     * @param channel
     * @returns {Object}
     */
    makeChannel(channel)
    {
        return typeof channel === 'object' ? channel : new channel(this.vue.$store)
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
        let subscription = this.activeSubscriptions.find(subscription => subscription.event === event);
        let handlers = [];

        if (!subscription) {
            throw new Error('Event ' + event + ' cannot be handled.');
        }

        // If it's a model related event...
        if (event.startsWith('Models.') || event.indexOf('App\\Events\\Models') >= 0) {
            // ...let it be handled by the model handler.
            handlers.push(new ModelHandler(this.vue));
        }

        for (let handler in subscription.handlers) {
            handlers.push(new subscription.handlers[handler](this.vue));
        }

        handlers.forEach(handler =>
        {
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
