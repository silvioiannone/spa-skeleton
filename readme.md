![Spooky SPA skeleton](https://i.imgur.com/f0eeixE.jpg)

# SPA-Skeleton

#### A VueJS based single page application that integrates with Laravel.

## Introduction

The main purpose of this package is to provide a quick starting point for developing a SPA.

Disclaimer: this product is used internally at Bloom Webb AB and it is subject to changes and
continuous development. I don't recommend using it as a starting point for your application at the
moment.

## Features

 - VueJS 2 core
 - State machine (Vuex)
 - Realtime translations (VueI18n)
 - Realtime WS events and global event hub
 - API client library
 - Route guards
 - Form validation
 - Vuetify support out of the box

## Usage

Require the package using **npm**:

    npm install spa-skeleton --save
    
Bootstrap the SPA simply using:

    import SPASkeleton from 'spa-skeleton';

    (new SPASkeleton).boot();

Add the following to you *webpack.mix.js* in order to build the SPA-Skeleton:

    const mix = require('laravel-mix'),
          SPASkeletonMix = require('spa-skeleton/webpack.mix.js');

    SPASkeletonMix.build(mix);

### Directives

New directives can be defined in the *resoureces/assets/js/App/Directives* directory and imported in
*resources/assets/js/App/Directives.js*.

Directive example: 

    export default {
    
        bind: (el, binding) =>
        {
            // Do stuff
        }
    }
    
Import the directive:

    import OnClick from './OnClick'
    
    export default {
        'on-click': OnClick
    }
    
[More about directives](https://vuejs.org/v2/guide/custom-directive.html).
    
### State machine modules

New state machine modules can be defined in *resources/assets/js/App/State/Modules* and imported in
*resources/assets/js/App/State.js*.

State machine module example:

    import AbstractModule from '../../../State/AbstractModule';
    
    /**
     * State machine user module.
     */
    export default class APP extends AbstractModule
    {
        constructor()
        {
            super();
    
            this.moduleName = 'app';
        }
    
        actions()
        {
            let self = this;
    
            return {
    
                /**
                 * Fetch a user.
                 */
                'user/FETCH'(store, params)
                {
                    return new Promise((resolve, reject) =>
                    {
                        // do stuff
                    });
                }
            }
        }
    
        /**
         * Define the APP module getters.
         */
        getters()
        {
            return {
                'app': state => state,
            }
        }
    
        /**
         * Define the APP module mutations.
         */
        mutations()
        {
            return {
    
                /**
                 * Set the APP state to "failed".
                 */
                'app/SET_STATE_FAILED'(state)
                {
                    state.status = 'failed';
                },
    
                /**
                 * Set the APP state to "loading".
                 */
                'app/SET_STATE_LOADING'(state)
                {
                    state.status = 'loading';
                }
            };
        }
    
        /**
         * Define the APP state.
         */
        state()
        {
            return {
    
                /*
                 * Marks whether the app just finished loading or not.
                 */
                fresh: true,
    
                /*
                 * The app status.
                 */
                status: null,
    
                /*
                 * The currently logged in user.
                 */
                user: {},
            }
        }
    }
    
Import the state machine module:

    import MyModule from './State/Modules/MyModule'
    
    export default {
        MyModule
    }
    
[More about state machine modules](https://vuex.vuejs.org/en/modules.html).

### Validator dictionary

The validator dictionary allows to change the error messages returned by the form validator.

The dictionary is defined in *resources/assets/js/App/Validator/Dictionary.js* and it follows the
[same format](http://vee-validate.logaretm.com/rules.html#field-sepecific-messages) defined by
[VeeValidate](http://vee-validate.logaretm.com/).

### Components

Components can be registered globally in *resources/assets/js/App/Components.js*:

    import MyComponent from './Components/MyComponent.vue';

    export default {
        'my-component': MyComponent,
    }
    
[More about components](https://vuejs.org/v2/guide/components.html).
    
### Plugins

Plugins can be imported using *resources/assets/js/App/Routes.js*.

Example plugin:

    export default
    {
        install(Vue, options)
        {
            Vue.prototype.$myplugin = ...
        }
    };
    
Import the plugin:

    import AwesomePlugin from './Plugins/AwesomePlugin'
    
    export default {
        AwesomePlugin
    }
   
[More about Vue plugins](https://vuejs.org/v2/guide/plugins.html).

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

        // List of guards that will be run before running the view actions.
        guards: ['Auth'],

        // Actions that should be run before displaying the view.
        actions: ['view/HOME'],

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