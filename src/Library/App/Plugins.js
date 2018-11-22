import _           from 'lodash';
import Log         from 'loglevel';
import PluginsList from 'js/App/Plugins';
import Config      from '../../Config';

// Skeleton plugins
import API from './Plugins/API';
import EventHub from './Plugins/EventHub';
import Navigator from './Plugins/Navigator';
import Vuetify from 'vuetify';
import VueI18N from 'vue-i18n';
import Vue2Filters from 'vue2-filters';
import VueRouter from 'vue-router';
import WebSocket from './Plugins/WebSocket';

/**
 * SPA-Skeleton plugins. The order is important.
 */
const SkeletonPlugins = {
    VueI18N,
    Vuetify,
    VueRouter,
    Vue2Filters,
    API,
    Navigator,
    EventHub,
    WebSocket
};

/**
 * This class binds all the needed plugins to Vue.
 */
export default class Plugins
{
    constructor(vue, translator)
    {
        this.translator = vue;
        this.vue = vue;
        this.beforeActions = {};
    }

    /**
     * Bind the plugins.
     */
    boot()
    {
        Log.debug('Loading plugins...');

        let availablePlugins = Object.assign(SkeletonPlugins, PluginsList);

        for (let key in availablePlugins) {

            let settings = {};

            if (key === 'Vuetify') {
                settings = {
                    theme: Config.ui.colors,
                };
            }

            if (this.beforeActions[key]) {
                this.beforeActions[key].forEach(action => {
                    let actionSettings = action();
                    settings = _.merge(settings, actionSettings)
                });
            }

            this.vue.use(availablePlugins[key], settings);

            Log.debug('Plugin "' + key + '" registered.');
        }

        Log.debug('Plugins loaded.');
    }

    /**
     * Register a callback that should be executed before a plugin is registered.
     *
     * @param plugin
     * @param callback Can an object containing the settings that should be passed to the plugin.
     * @return Plugins
     */
    before(plugin, callback)
    {
        if (! this.beforeActions[plugin]) {
            this.beforeActions[plugin] = [];
        }

        this.beforeActions[plugin].push(callback);

        return this;
    }
}
