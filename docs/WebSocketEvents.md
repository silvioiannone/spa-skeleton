# WebSocket Events

## Subscription

Connecting to the WebSocket server is needed in order to receive real time events and notifications.

    mounted()
    {
        this.$ws.subscribe(this);
    }

This will subscribe to all the events defined in *resources/ts/App/Subscriptions.ts* and the
default ones defined by `spa-skeleton`. If you're using the `layout-app` component it will
automatically try to connect to the WS server when it's mounted.

## Events

The events the SPA should listen must be defined in *resources/ts/App/Subscriptions.ts*.

    import App from './Channels/App';
    import AppHandler form './Events/Handlers';

    export default [
        {
            event: 'Models.CompanyCreated',
            channels: [App],
            handlers: {AppHandler}
        },
        ...
    ]
    
    // resources/ts/App/Subscriptions.ts

Every event can be fired on multiple channels. A new channel (room) can be created within the
*resources/ts/App/Channels* folder. Here's an example:

    import AbstractChannel from 'spa-skeleton/src/Library/WebSocket/AbstractChannel';
    
    /**
     * Global App WS channel.
     */
    export default class App extends AbstractChannel
    {
        /**
         * Get the channel name.
         */
        name(): string
        {
            return 'App';
        }
    }

Each channel has access to the store (using `this.store`) in order to access the needed data. The 
`name()` function must return the channel name (For example: **App**, **User.1**, **Company.4**).

## Usage

It's a good idea to not add all the possible events to *resources/assets/js/App/Subscriptions.js*. 
View specific events should be specified inside the view's component:

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

## Event handlers

Event handlers are responsible for performing certain actions when an event occurs.

Each event handler must have a function with the same name as the event they are handling. E.g.:

This subscriptions definition

    export default [
        {
            event: 'Models.CompanyCreated',
            channels: [App],
            handlers: {AppHandler}
        },
        ...
    ]
    
    // resources/assets/js/App/Subscriptions.js

will require the `AppHander` to be defined like this:

    import AbstractHandler from 'spa-skeleton/src/Library/Events/AbstractHandler';

    export default class AppHandler extends AbstractHandler
    {
        'Models.CompanyCreated'(event)
        {

        }
    }

    // resources/assets/js/App/Events/AppHandler.js
