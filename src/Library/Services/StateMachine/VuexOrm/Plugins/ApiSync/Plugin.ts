import { Components, Options } from '@vuex-orm/core/lib/plugins/use';

// Actions
import { Get } from './Actions/Get';
import { Create } from './Actions/Create';
import { Update } from './Actions/Update';

/**
 * This plugin synchronizes the state machine against the API.
 *
 * Inspired by:
 *  - https://github.com/vuex-orm/plugin-axios
 *  - https://github.com/vuex-orm/plugin-graphql
 */
export class Plugin
{
    /**
     * Install the plugin.
     */
    static install(components: Components, options: Options)
    {
        Plugin.setupActions(components);
    }

    /**
     * Setup the Vuex actions that will be executed.
     */
    protected static setupActions(components: Components): void
    {
        Get.boot();
        Create.boot();
        Update.boot();

        components.Actions.$get = Get.execute.bind(Get);
        components.Actions.$create = Create.execute.bind(Create);
        components.Actions.$update = Update.execute.bind(Update);
    }
}

