# Plugins

Plugins can be imported in *resources/assets/js/App/Plugins.js*.

Example plugin:

    export default
    {
        install(Vue, options)
        {
            Vue.prototype.$myplugin = ...
        }
    };

    // resources/assets/js/App/Plugins/AwesomePlugin.js

Import the plugin:

    import AwesomePlugin from './Plugins/AwesomePlugin'

    export default {
        AwesomePlugin
    }

    // resources/assets/js/App/Plugins.js

## Available plugins

`spa-skeleton` ships the following plugins:

- API: Makes the API client easily accessible from any Vue component.
- EventHub: A global event hub.
- WebSocket: Allows to interact with the WS client from any Vue component.

---
[More about Vue plugins](https://vuejs.org/v2/guide/plugins.html).