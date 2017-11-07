import Log         from 'loglevel';
import PluginsList from 'assets/js/App/Plugins'

// Skeleton plugins
import EventHub           from './Plugins/EventHub';
import Vuetify            from 'vuetify';
import VueI18N            from 'vue-i18n';
import VueRouter          from 'vue-router';
import VueVirtualScroller from 'vue-virtual-scroller';
import WebSocket          from './Plugins/WebSocket';

const SkeletonPlugins = {
    EventHub,
    Vuetify,
    VueI18N,
    VueRouter,
    VueVirtualScroller,
    WebSocket
}

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

        let availablePlugins = {};
        Object.assign(availablePlugins, SkeletonPlugins, PluginsList);

        for (let key in availablePlugins)
        {
            this.vue.use(availablePlugins[key]);

            Log.debug('Plugin "' + key + '" registered.')
        }

        Log.debug('Plugins loaded.');
    }
}
