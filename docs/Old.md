### Filters

Filters can be imported using *resources/assets/js/App/Filters.js*.

Example filter:

    export default function (value)
    {
        return value + value;
    }
    
Import the filter:

    import ShinyFilter from './Filters/ShinyFilter'
        
    export default {
        shiny: ShinyFilter
    }
    
The filter can be used in any component simply by using:

    <p>{{ model.value | shiny }}</p>
    
[More about Vue filters](https://vuejs.org/v2/guide/filters.html).

### Translations

Translations files can be defined in *resources/assets/locales/<locale>.json*.

For example *resources/assets/locales/sv.json* looks like this:

    {
        "settings": {
            "company": "Bolag",
            "language": "Språk"
        }
    }

These files should be available in the *public/locales* folder. Using Laravel Mix you can simply
use:

    Mix.copy('resources/assets/locales', 'public/locales')

### Routes

New routes can be defined in the *resources/assets/js/App/Routes.js*:

    export default [

        // Route of the view.
        path: '/home',

        // Component that should render the view.
        component: resolve => { require(['../Components/Views/Home.vue'], resolve); },

        meta: {
            // List of guards that will be run before running the view actions.
            guards: ['Auth'],
        
            // Actions that should be run before displaying the view.
            actions: ['view/HOME']
        },

        // Children routes definition
        children: [
            {
                path: '',
                components: {
                    default: resolve => { require(['../Components/Views/Home/Index.vue'], resolve); },
                    toolbar: resolve => { require(['../Components/Toolbars/Home.vue'], resolve); },
                    navigationDrawer: resolve => { require(['../Components/NavigationDrawers/Home.vue'], resolve); }
                }
            }
        ]
    ]
    
[More info about the routes](https://router.vuejs.org/en/).

### WebSocket: Events & subscriptions

#### Connection

Connecting to the WebSocket server is needed in order to receive real time events, and it's simple
as calling the following from inside a component:

    mounted()
    {
        this.$ws.subscribe(this);
    }
    
The possibility to specify to which events to subscribe to for each view will be made available in
the future.

#### Events

The events the SPA should listen must be defined in *resources/assets/js/App/Subscriptions.js*.

    import App from './Channels/App';

    export default [
        {
            event: 'Models.CompanyCreated',
            channels: [App]
        },
        ...
        
Every event can be fired on multiple channel. A new channel can be created within the
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

Each channel has access to the store (using `this.store`) in order to access the needed data. The
`name()` method must return the channel name (For example: **App**, **User.1**, **Company.4** are
valid channel names.).
