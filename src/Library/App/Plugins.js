import Log from 'loglevel';
import PluginsList from 'assets/js/App/Plugins'

// Skeleton plugins
import API from './Plugins/API';
import EventHub from './Plugins/EventHub';
import Vuetify from 'vuetify';
import VueI18N from 'vue-i18n';
import Vue2Filters from 'vue2-filters';
import VueRouter from 'vue-router';
import WebSocket from './Plugins/WebSocket';

const SkeletonPlugins = {
    API,
    EventHub,
    Vuetify,
    VueI18N,
    VueRouter,
    Vue2Filters,
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
            this.vue.use(availablePlugins[key]);

            Log.debug('Plugin "' + key + '" registered.')
        }

        Log.debug('Plugins loaded.');
    }
}
