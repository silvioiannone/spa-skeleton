import Log                  from 'loglevel';
import Vue                  from 'vue';
import { Store }            from 'vuex';
import VueRouter, { Route } from 'vue-router';
import VueI18N              from 'vue-i18n';
import { sync }             from 'vuex-router-sync';
import Api                  from '../Api';
import Config               from '../../Config';
import Guard                from './Guard';
import Translator           from './Translator';
//import MixinRoot          from '../../Components/Mixins/Root';
//import RootViewComponent  from '../../Components/Views/Root';
import Routes               from '../../../../../resources/ts/App/Routes';

/**
 * Application router.
 */
export default class Router
{
    /**
     * API client.
     */
    protected api: Api;

    /**
     * Set the translator.
     */
    protected translator: Translator;

    /**
     * Constructor.
     */
    constructor()
    {
        this.api = new Api;
    }

    /**
     * Set the translator.
     */
    setTranslator(translator: Translator): Router
    {
        this.translator = translator;

        return this;
    }

    /**
     * Boot the router.
     */
    boot(store: Store<any>)
    {
        Log.debug('Booting router...');

        let guard = new Guard();
        let scrollPromise = new Promise((resolve: Function, reject: Function) =>
        {
            guard.onComplete((to: Route, from: Route) =>
            {
                if (to.hash) {
                    resolve({ selector: to.hash });
                    return;
                }

                resolve({});
            });
        });

        // Create a new router instance
        let router = new VueRouter({
            linkActiveClass: Config.router.linkActiveClass,
            mode : Config.router.mode,
            routes: [
                {
                    path: '',
                    meta: {
                        actions: ['view/ROOT']
                    },
                    //component: RootViewComponent,
                    children: Routes
                }
            ],
            scrollBehavior(to: Route, from: Route, savedPosition: any)
            {
                return new Promise((resolve, reject) =>
                {
                    scrollPromise
                        .then((solution: any) => {
                            // The timeout is needed because we need to wait for the view animation
                            // to finish.
                            setTimeout(() => resolve(solution), 500);
                        })
                        .catch((reason: any) => {
                            if (reason !== {}) {
                                Log.error('Scroll behaviour failed.');
                                Log.error(reason);
                                reject(reason);
                                return;
                            }

                            resolve(savedPosition || { x: 0, y: 0 })
                        })
                })
            }
        });

        // Execute the guard before loading each route
        guard.init(router, store).run();

        // Router root component
        let app = new Vue({

            // Bind the router to the root component
            router,

            // Bind the store so that it's available to all children components
            store,

            //mixins: [MixinRoot],

            i18n: this.translator.get(),

            // The root `div` is needed in order for the Vue devtools to work properly.
            // template: '<div><animated-router-view></animated-router-view></div>'
            template: '<div>I\'m alive.</div>'
        });

        app.$mount(Config.appSelector);

        // Synchronize the router with the store. Allows to save the router state in the state
        // machine store.
        sync(store, router);

        Log.debug('Router ready.');
    }
}
