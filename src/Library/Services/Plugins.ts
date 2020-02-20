import _                     from 'lodash';
import Vue                   from 'vue';
import { Service }           from './Service';
import { Logger }            from './Logger'
import { Translator }        from './Translator';
import { Config }            from '../../Config';
import { VuetifyUseOptions } from 'vuetify';
import AppPlugins            from '../../../../../resources/ts/App/Plugins';

// Skeleton plugins
import Vuetify                    from 'vuetify';
import VueI18N                    from 'vue-i18n';
import VueRouter                  from 'vue-router';
import VueTheMask                 from 'vue-the-mask';
import Vue2Filters                from 'vue2-filters';
import { Api }                    from '../App/Plugins/Api';
import { Config as ConfigPlugin } from '../App/Plugins/Config';
import { EventHub }               from '../App/Plugins/EventHub';
import { Head }                   from '../App/Plugins/Head';
import { Navigator }              from '../App/Plugins/Navigator';
import { Ui }                     from '../App/Plugins/Ui';
import { WebSocket }              from '../App/Plugins/WebSocket';

/**
 * SPA-Skeleton plugins. The order is important.
 */
const SkeletonPlugins = {
    VueI18N,
    Vuetify,
    Vue2Filters,
    VueRouter,
    VueTheMask,
    Api,
    Config: ConfigPlugin,
    Navigator,
    EventHub,
    Head,
    Ui,
    WebSocket
};

export interface BeforeActions { [key: string]: Function[] }

/**
 * This service registers various Vue plugins.
 */
export class Plugins extends Service
{
    /**
     * Service name.
     */
    public name: string = 'Plugins';

    /**
     * Actions to perform before registering a plug-in.
     */
    protected beforeActions: BeforeActions = {};

    /**
     * Constructor.
     */
    public constructor()
    {
        super();

        this.before('Vuetify', (): VuetifyUseOptions =>
        {
            let translatorInstance = (new Translator).boot().get();

            return {
                //lang: {
                //    t: (key: string, ...params: any): string =>
                //        translatorInstance.t(key, params) as string
                //}
            }
        });
    }

    /**
     * Bind the plugins.
     */
    public boot(): void
    {
        let availablePlugins = {...SkeletonPlugins, ...AppPlugins};

        for (let key in availablePlugins) {

            let settings = {};

            if (key === 'Vuetify') {
                settings = {
                    theme: Config.ui.colors,
                };
            }

            if (this.beforeActions[key]) {
                this.beforeActions[key].forEach((action: Function): void => {
                    let actionSettings = action();
                    settings = _.merge(settings, actionSettings)
                });
            }

            Vue.use(availablePlugins[key], settings);

            Logger.debug(`Plugin "${key}" registered.'`);
        }
    }

    /**
     * Register a callback that should be executed before a plugin is registered.
     */
    public before(plugin: string, callback: Function): Plugins
    {
        if (! this.beforeActions[plugin]) {
            this.beforeActions[plugin] = [];
        }

        this.beforeActions[plugin].push(callback);

        return this;
    }

    /**
     * Get the Vuetify plugin instance.
     */
    public static getVuetify(): typeof Vuetify
    {
        return new Vuetify();
    }
}
