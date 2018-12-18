import _           from 'lodash';
import Log         from 'loglevel';
import Vue         from 'vue';
import PluginsList from '../../../../../resources/js/App/Plugins';
import Config      from '../../Config';

// Skeleton plugins
import Vuetify     from 'vuetify';
import VueI18N     from 'vue-i18n';
import VueRouter   from 'vue-router';
import Api         from './Plugins/Api';
import EventHub    from './Plugins/EventHub';
import Navigator   from './Plugins/Navigator';
import WebSocket   from './Plugins/WebSocket';

/**
 * SPA-Skeleton plugins. The order is important.
 */
const SkeletonPlugins = {
    VueI18N,
    Vuetify,
    VueRouter,
    Api,
    Navigator,
    EventHub,
    WebSocket
};

/**
 * This class binds all the needed plugins to Vue.
 */
export default class Plugins
{
    /**
     * Actions to perform before registering a plug-in.
     */
    protected beforeActions: any;

    /**
     * Constructor.
     */
    constructor()
    {
        this.beforeActions = {};
    }

    /**
     * Bind the plugins.
     */
    boot()
    {
        Log.debug('Loading plugins...');

        let availablePlugins = {...SkeletonPlugins, ...PluginsList};

        for (let key in availablePlugins) {

            let settings = {};

            if (key === 'Vuetify') {
                settings = {
                    theme: Config.ui.colors,
                };
            }

            if (this.beforeActions[key]) {
                this.beforeActions[key].forEach((action: Function) =>
                {
                    let actionSettings = action();
                    settings = _.merge(settings, actionSettings)
                });
            }

            Vue.use(availablePlugins[key], settings);

            Log.debug('Plugin "' + key + '" registered.');
        }

        Log.debug('Plugins loaded.');
    }

    /**
     * Register a callback that should be executed before a plugin is registered.
     */
    before(plugin: any, callback: Function)
    {
        if (! this.beforeActions[plugin]) {
            this.beforeActions[plugin] = [];
        }

        this.beforeActions[plugin].push(callback);

        return this;
    }
}
