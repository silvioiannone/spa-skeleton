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

- [API](plugins/API.md): Makes the API client easily accessible from any Vue component.
- [EventHub](plugins/EventHub.md): A global event hub.
- [WebSocket](plugins/WebSocket.md): Allows to interact with the WS client from any Vue component.

---
[More about Vue plugins](https://vuejs.org/v2/guide/plugins.html).
