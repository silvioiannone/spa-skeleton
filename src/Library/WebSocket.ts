import Echo, { Channel as EchoChannel } from 'laravel-echo';
import IO                               from 'socket.io-client';
import { Logger as Log }                from './Services/Logger';
import Vue                              from 'vue';
import { Config }                       from '../Config';
import Subscriptions                    from '../../../../resources/ts/App/Subscriptions';
import { ApiFactory }                   from './Api';
import { Admin as AdminChannel }        from './WebSocket/Channels/Admin';
import { App as AppChannel }            from './WebSocket/Channels/App';
import { User as UserChannel }          from './WebSocket/Channels/User';
import { AppHandler }                   from './Events/AppHandler';
import { ModelHandler }                 from './Events/ModelHandler';
import { Token }                        from './Api/Token';
import { Subscription }                 from './Interfaces/Subscription';
import { Channel }                      from './Types/Channel';
import { Channel as ChannelInterface }  from './Interfaces/Channel';

/**
 * This class enables real time communication between the SPA and the server.
 */
export class WebSocket
{
    /**
     * The Skeleton's subscriptions.
     */
    protected skeletonSubscriptions: Subscription[] = [
        {
            event: 'Models.User.Updated',
            channels: [AdminChannel, UserChannel],
            handlers: [AppHandler]
        },
        {
            event: '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent',
            channels: [UserChannel],
            handlers: [AppHandler]
        },
        {
            event: '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\AppUpdated',
            channels: [AppChannel],
            handlers: [AppHandler]
        },
        {
            event: '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\DbSeeded',
            channels: [AppChannel],
            handlers: [AppHandler]
        },
        {
            event: '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\DbSeedingStarted',
            channels: [AppChannel],
            handlers: [AppHandler]
        },
        {
            event: '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\SettingsUpdated',
            channels: [AppChannel],
            handlers: [AppHandler]
        }
    ];

    /**
     * The Laravel echo server.
     */
    protected echo: Echo;

    /**
     * Pending subscriptions.
     */
    protected pendingSubscriptions: Subscription[] = [];

    /**
     * List of active subscriptions.
     */
    protected activeSubscriptions: Subscription[] = [];

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
    public constructor()
    {
        // Make the Socket.IO client library global so that it can be accessed by Laravel Echo.
        (window as any).io = IO;
    }

    /**
     * Subscribe the client.
     */
    public subscribe(): void
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
    public listen(subscriptions: Subscription[]): void
    {
        if (! this.echo) {
            this.pendingSubscriptions = this.pendingSubscriptions.concat(subscriptions);
            return;
        }

        this.updateEchoHeaders();

        subscriptions.forEach((subscription): void => {
            if (this.activeSubscriptions.indexOf(subscription) >= 0) return;

            // TODO: add the subscription to the list of the active subscriptions only if the
            // joining was successful (use a promise).
            subscription.channels.forEach((channel): void =>
                this.join(channel, subscription.event)
            );

            // Add the subscription to the active subscriptions.
            this.activeSubscriptions = this.activeSubscriptions.concat(subscription);
        });
    }

    /**
     * Remove the subscriptions.
     */
    public silence(subscriptions: Subscription[]): void
    {
        subscriptions.forEach((subscription): void => {
            // Find where the current subscription's position.
            let index = this.activeSubscriptions.findIndex((activeSubscription): boolean => {
                return activeSubscription.event === subscription.event
            });

            // This will remove the event callbacks.
            this.activeSubscriptions[index].channels.forEach((channel) => {
                let channelInstance = WebSocket.makeChannel(channel);
                this.makeEchoChannel(channelInstance).stopListening(subscription.event);
            });

            // Remove teh subscription.
            this.activeSubscriptions.splice(index, 1);

            subscription.channels.forEach((channel: any): void => {
                let channelInstance = WebSocket.makeChannel(channel);

                Log.info('No longer listening to ' + subscription.event + ' in the ' +
                    channelInstance.name() + ' room.');

                this.leaveChannelIfUnused(channelInstance);
            });
        });
    }

    /**
     * Leave a channel if it's not used by any event.
     */
    public leaveChannelIfUnused(channel: ChannelInterface): void
    {
        let channelInUse = false;

        this.activeSubscriptions.forEach((subscription): void => {
            if (channelInUse) {
                return;
            }

            let found = subscription.channels.find((currentChannel: any): boolean =>
                WebSocket.makeChannel(currentChannel).name() === channel.name()
            );

            if (found) {
                channelInUse = true;
            }
        });

        if (! channelInUse) {
            this.echo.leave(channel.name());
            Log.debug('Channel ' + channel.name() + ' left.');
        }
    }

    /**
     * Listen for an event on a channel.
     */
    protected join(channel: Channel, event: any): void
    {
        let self = this;
        let channelInstance = WebSocket.makeChannel(channel);

        if (! channelInstance.canEnter()) {
            return;
        }

        Log.info('Listening to ' + event + ' in the ' + channelInstance.name() + ' room.');

        this.makeEchoChannel(channelInstance)
            .listen(event, (payload: any): void => {
                if (event === '.Bloom\\Cluster\\Kernel\\App\\Events\\NotificationSent') {
                    Log.debug('Notification received: ' + payload.response.type + '.');
                }

                self.broadcast(event, payload);
            });
    }

    /**
     * Create an Echo Channel instance.
     */
    protected makeEchoChannel(channel: ChannelInterface): EchoChannel
    {
        return channel.isPrivate() ?
            this.echo.private(channel.name()) :
            this.echo.channel(channel.name());
    }

    /**
     * Make a channel instance.
     */
    public static makeChannel(channel: Channel): ChannelInterface
    {
        return typeof channel === 'object' ? channel : new channel();
    }

    /**
     * Broadcast an event to all vue components and execute the state mutations needed.
     */
    public broadcast(event: string, payload: any): void
    {
        // Fire the event globally using the EventHub
        this.vue.$eh.$emit(event, payload);

        this.handleEvent(event, payload);

        Log.debug('Broadcasted event ' + event + '.');
    }

    /**
     * Handle an event received from the WebSocket server.
     */
    public handleEvent(event: string, message: any): void
    {
        let subscription = this.activeSubscriptions
            .find((subscription): boolean => subscription.event === event);
        let handlers = [];

        if (! subscription) {
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

        handlers.forEach((handler): void => handler.handle(event, message));
    }

    /**
     * Connect to the WebSocket server.
     */
    public connect(vue: Vue): this
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

        callbacks.$connect.push((): void =>
        {
            // Set the socket ID in the API
            ApiFactory.setSocketId(this.echo.socketId());
            this.isConnected = true;
            Log.debug('Connected to the WebSocket server (ID: ' + this.echo.socketId() + ')');
        });

        if (! callbacks.$reconnect) {
            callbacks.$reconnect = [];
        }

        callbacks.$reconnect.push((): void => Log.debug('Reconnecting to the WebSocket server...'));

        return this;
    }

    /**
     * Update Laravel echo headers.
     */
    public updateEchoHeaders(): void
    {
        this.echo.connector.options.auth.headers['Authorization'] = `Bearer ` +
            Token.getAccessToken();
    }

    /**
     * Disconnect from the WebSocket server.
     */
    public disconnect(): void
    {
        if (this.echo) {
            this.echo.disconnect();
            this.isConnected = false;
        }
    }
}
