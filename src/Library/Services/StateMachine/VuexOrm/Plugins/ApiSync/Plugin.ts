import { PluginComponents } from '@vuex-orm/core';

// Actions
import { Create } from './Actions/Create';
import { Delete } from './Actions/Delete';
import { Get }    from './Actions/Get';
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
    public static install(components: PluginComponents): void
    {
        Plugin.setupActions(components);
    }

    /**
     * Setup the Vuex actions that will be executed.
     */
    protected static setupActions(components: PluginComponents): void
    {
        Get.boot();
        Create.boot();
        Update.boot();
        Delete.boot();

        components.Actions.$get = Get.execute.bind(Get);
        components.Actions.$create = Create.execute.bind(Create);
        components.Actions.$update = Update.execute.bind(Update);
        components.Actions.$delete = Delete.execute.bind(Delete);
    }
}

