import Echo            from 'laravel-echo';
import IO              from 'socket.io-client';
import Log             from './Services/Logger';
import Vue             from 'vue';
import Config          from '../Config';
import Subscriptions   from '../../../../resources/ts/App/Subscriptions';
import ApiFactory      from './Api';
import StateMachine    from './Services/StateMachine';
import AdminChannel    from './WebSocket/Channels/Admin';
import AppChannel      from './WebSocket/Channels/App';
import UserChannel     from './WebSocket/Channels/User';
import AbstractChannel from './WebSocket/AbstractChannel';
import AppHandler      from './Events/AppHandler';
import ModelHandler    from './Events/ModelHandler';
import Token           from './Api/Token';

/**
 * This class enables real time communication between the SPA and the server.
 */
export default class WebSocket
{
    /**
     * The Skeleton's subscriptions.
     */
    protected skeletonSubscriptions: Array<any> = [
        {
            event: 'Models.User.Updated',
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
    protected echo: Echo;

    /**
     * Pending subscriptions.
     */
    protected pendingSubscriptions: Array<any> = [];

    /**
     * List of active subscriptions.
     */
    protected activeSubscriptions: Array<any> = [];

    /**
     * Vue.
     */
    protected vue: Vue;

    /**
     * Whether the connection with the WS server is established.
     */
    protected isConnected: boolean = false;

    /**
     * Constructor.
     */
    constructor()
    {
        // Make the Socket.IO client library global so that it can be accessed by Laravel Echo.
        (<any>window).io = IO;
    }

    /**
     * Subscribe the client.
     */
    subscribe(): void
    {
        if(! Config.webSocket.enabled) {
            return;
        }

        let subscriptions = this.skeletonSubscriptions
            .concat(Subscriptions)
            .concat(this.pendingSubscriptions);

        this.listen(subscriptions);
    }

    /**
     * Subscribe to a channel and listen to an event.
     */
    listen(subscriptions: Array<any>): void
    {
        if (! this.echo) {
            this.pendingSubscriptions = this.pendingSubscriptions.concat(subscriptions);
            return;
        }

        this.updateEchoHeaders();

        subscriptions.forEach(subscription =>
        {
            if (this.activeSubscriptions.indexOf(subscription) >= 0) return;

            // TODO: add the subscription to the list of the active subscriptions only if the
            // joining was successful (use a promise).
            subscription.channels.forEach((channel: any) => this.join(channel, subscription.event));

            // Add the subscription to the active subscriptions.
            this.activeSubscriptions = this.activeSubscriptions.concat(subscription);
        });
    }

    /**
     * Remove the subscriptions.
     */
    silence(subscriptions: Array<any>): void
    {
        subscriptions.forEach(subscription =>
        {
            let index = this.activeSubscriptions.indexOf(subscription);
            this.activeSubscriptions.splice(index, 1);

            subscription.channels.forEach((channel: any) =>
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
     */
    leaveChannelIfUnused(channel: any): void
    {
        let channelName = this.makeChannel(channel).name();
        let channelInUse = false;
        this.activeSubscriptions.forEach(subscription =>
        {
            if (channelInUse) {
                return;
            }

            let found = subscription.channels
                .find((channel: any) => this.makeChannel(channel).name() === channelName);

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
     */
    protected join(channel: any, event: any): void
    {
        let self = this;
        let channelInstance = this.makeChannel(channel);

        if (! channelInstance.canEnter()) {
            return;
        }

        Log.info('Listening to ' + event + ' in the ' + channelInstance.name() + ' room.');

        let _channel = channelInstance.isPrivate() ?
            this.echo.private(channelInstance.name()) :
            this.echo.channel(channelInstance.name());

        _channel.listen(event, (payload: any) =>
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
     */
    makeChannel(channel: any): AbstractChannel
    {
        let store = StateMachine.getStore()

        return typeof channel === 'object' ? channel : new channel(store);
    }

    /**
     * Broadcast an event to all vue components and execute the state mutations needed.
     */
    broadcast(event: string, payload: any): void
    {
        // Fire the event globally using the EventHub
        this.vue.$eh.$emit(event, payload);

        this.handleEvent(event, payload);

        Log.debug('Broadcasted event ' + event + '.');
    }

    /**
     * Handle a notification.
     */
    handleNotification(notification: any): void
    {
        this.vue.$store.commit('notifications/ADD', {data: notification});

        Log.debug('Notification received: ' + notification.type + '.');
    }

    /**
     * Handle an event received from the WebSocket server.
     */
    handleEvent(event: string, message: any): void
    {
        let subscription = this.activeSubscriptions
            .find(subscription => subscription.event === event);
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
     */
    connect(vue: Vue): this
    {
        if (this.isConnected) {
            return this;
        }

        this.vue = vue;

        this.echo = new Echo({
            broadcaster: 'socket.io',
            host: Config.webSocket.host + ':' + Config.webSocket.port
        });
        this.updateEchoHeaders();

        let callbacks = this.echo.connector.socket._callbacks;

        callbacks.$connect.push(() =>
        {
            // Set the socket ID in the API
            ApiFactory.setSocketId(this.echo.socketId());
            this.isConnected = true;
            Log.debug('Connected to the WebSocket server (ID: ' + this.echo.socketId() + ')');
        });

        if (! callbacks.$reconnect) {
            callbacks.$reconnect = [];
        }

        callbacks.$reconnect.push(() =>
        {
            Log.debug('Reconnecting to the WebSocket server...');
        });

        return this;
    }

    /**
     * Update Laravel echo headers.
     */
    updateEchoHeaders(): void
    {
        this.echo.connector.options.auth.headers['Authorization'] = `Bearer ` +
            (new Token).getAccessToken();
    }

    /**
     * Disconnect from the WebSocket server.
     */
    disconnect(): void
    {
        if (this.echo) {
            this.echo.disconnect();
            this.isConnected = false;
        }
    }
}
