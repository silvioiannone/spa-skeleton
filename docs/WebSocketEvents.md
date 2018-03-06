# WebSocket Events

## Subscription

Connecting to the WebSocket server is needed in order to receive real time events and notifications.

    mounted()
    {
        this.$ws.subscribe(this);
    }

This will subscribe to all the events defined in *resources/assets/js/App/Subscriptions.js*.

## Events

The events the SPA should listen must be defined in *resources/assets/js/App/Subscriptions.js*.

    import App from './Channels/App';

    export default [
        {
            event: 'Models.CompanyCreated',
            channels: [App]
        },
        ...
    ]
    
    // resources/assets/js/App/Subscriptions.js

Every event can be fired on multiple channel. A new channel (room) can be created within the
*resources/assets/js/App/Channels* folder. Here's an example:

    import AbstractChannel from 'spa-skeleton/src/Library/WebSocket/AbstractChannel';
    
    /**
     * Global App WS channel.
     */
    export default class App extends AbstractChannel
    {
        /**
         * Get the channel name.
         */
        name()
        {
            return 'App';
        }
    }

Each channel has access to the store (using `this.store`) in order to access the needed data. The `name()` function must
return the channel name (For example: **App**, **User.1**, **Company.4**).

## Usage

It's a good idea to not add all the possible events to *resources/assets/js/App/Subscriptions.js*. View specific events
should be specified inside the view's component:

    mounted()
    {
        let event = '.Bloom\\Cluster\\Conversations\\App\\Events\\Models\\ConversationAttached';
    
        this.$ws
            .subscribe(this) // You don't need to subscribe if a parent component already does that.
            .listenTo({
                event,
                channels: [<import channel>]
            });
    }

    destroyed()
    {
        this.$ws.leave(ConversationChannel);
    }
