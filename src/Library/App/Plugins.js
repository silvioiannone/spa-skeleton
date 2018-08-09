import Log from 'loglevel';
import PluginsList from 'assets/js/App/Plugins'
import Config from '../../Config';

// Skeleton plugins
import API from './Plugins/API';
import EventHub from './Plugins/EventHub';
import Navigator from './Plugins/Navigator';
import Vuetify from 'vuetify';
import VueI18N from 'vue-i18n';
import Vue2Filters from 'vue2-filters';
import VueRouter from 'vue-router';
import WebSocket from './Plugins/WebSocket';

const SkeletonPlugins = {
    Vuetify,
    VueI18N,
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
    constructor(vue)
    {
        this.vue = vue;
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
                    theme: Config.ui.colors
                };
            }

            this.vue.use(availablePlugins[key], settings);

            Log.debug('Plugin "' + key + '" registered.')
        }

        Log.debug('Plugins loaded.');
    }
}
