# WebSocket plugin

The WebSocket plugin provides easy access to the WebSocket client.

## Usage

From within any component you can easily listen to events in a room. Here is an example using the `created()` Vue hook:

    import ConversationChannel from '...';

    export default {
    
        mounted()
        {
            let event = '.Bloom\\Cluster\\Conversations\\App\\Events\\Models\\ConversationAttached';
        
            this.$ws.listenTo({
                event,
                channels: [ConversationChannel]
            });
        }
    }
    
Remember also to leave the room when the component is destroyed.
    
    destroyed()
    {
        this.$ws.leave(ConversationChannel);
    }

## Guidelines

Instead of registering all the WebSocket events globally in the *resources/assets/js/App/Subscriptions.js*, it is
usually a good idea to subscribe only to the WebSocket events needed by the view using the view's.
