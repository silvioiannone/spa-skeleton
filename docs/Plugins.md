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

- [API](Plugins/API.md): Makes the API client easily accessible from any Vue component.
- [EventHub](Plugins/EventHub.md): A global event hub.
- [Navigator](Plugins/Navigator.md): A navigation helper.
- [WebSocket](Plugins/WebSocket.md): Allows to interact with the WS client from any Vue component.

---
[More about Vue plugins](https://vuejs.org/v2/guide/plugins.html).
