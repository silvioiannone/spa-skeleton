import BugsnagPluginVue from '@bugsnag/plugin-vue';
import _                from 'lodash';
import Vue              from 'vue';
import { Service }      from './Service';
import { Logger }       from './Logger'
import { Translator }   from './Translator';
import { Config }       from '../../Config';
import AppPlugins       from '../../../../../resources/ts/App/Plugins';
import Bugsnag          from '@bugsnag/js';
import Vuetify          from 'vuetify';
import VueI18N          from 'vue-i18n';
import VueRouter        from 'vue-router';
import VueTheMask       from 'vue-the-mask';
import Vue2Filters      from 'vue2-filters';

// Skeleton plugins
import { Api }                    from '../App/Plugins/Api';
import { Config as ConfigPlugin } from '../App/Plugins/Config';
import { EventHub }               from '../App/Plugins/EventHub';
import { Head }                   from '../App/Plugins/Head';
import { Navigator }              from '../App/Plugins/Navigator';
import { Ui }                     from '../App/Plugins/Ui';
import { Utils }                  from '../App/Plugins/Utils';
import { User }                   from '../App/Plugins/User';
import { WebSocket }              from '../App/Plugins/WebSocket';

/**
 * SPA-Skeleton plugins. The order is important.
 */
const SkeletonPlugins = {
    VueRouter,
    VueI18N,
    Vue2Filters,
    VueTheMask,
    Vuetify,
    Api,
    Config: ConfigPlugin,
    Navigator,
    EventHub,
    Head,
    Ui,
    Utils,
    User,
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
    protected static beforeActions: BeforeActions = {};

    /**
     * Bind the plugins.
     */
    public static async boot(): Promise<void>
    {
        let availablePlugins = {...SkeletonPlugins, ...AppPlugins};

        for (let key in availablePlugins) {

            let settings = {};

            if (Plugins.beforeActions[key]) {
                Plugins.beforeActions[key].forEach((action: Function): void => {
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
    public static before(plugin: string, callback: Function): Plugins
    {
        if (! Plugins.beforeActions[plugin]) {
            Plugins.beforeActions[plugin] = [];
        }

        Plugins.beforeActions[plugin].push(callback);

        return this;
    }

    /**
     * Get the Vuetify plugin instance.
     */
    public static getVuetify(): Vuetify
    {
        let translator = Translator.get();

        return new Vuetify({
            lang: {
                t: (key: string, ...params: any): string =>
                    translator.t(key, params) as string
            },
            theme: {
                themes: {
                    light: Config.ui.colors
                }
            }
        });
    }
}
