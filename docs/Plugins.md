# Plugins

Plugins can be imported in *resources/assets/js/App/Plugins.js*.

Example plugin:

    export default function Api(vue: typeof Vue, options?: any): void
    {
        vue.prototype.$api = // Do something here
    }

    // resources/ts/App/Plugins/Api.js

Import the plugin:

    import Api from './Plugins/Api'

    export default {
        Api
    }

    // resources/ts/App/Plugins.js

## Available plugins

`spa-skeleton` ships the following plugins:

- [API](Plugins/API.md): Makes the API client easily accessible from any Vue component.
- [EventHub](Plugins/EventHub.md): A global event hub.
- [Navigator](Plugins/Navigator.md): A navigation helper.
- [WebSocket](Plugins/WebSocket.md): Allows to interact with the WS client from any Vue component.

---
[More about Vue plugins](https://vuejs.org/v2/guide/plugins.html).
