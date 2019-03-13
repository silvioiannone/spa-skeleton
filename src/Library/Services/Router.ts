import Vue                  from 'vue';
import VueRouter, { Route } from 'vue-router';
import { sync }             from 'vuex-router-sync';
import Api                  from '../Api';
import Config               from '../../Config';
import Guard                from '../Guard';
import Logger               from './Logger';
import Service              from './Service';
import Translator           from './Translator';
import Routes               from '../../../../../resources/ts/App/Routes';
import StateMachine         from './StateMachine';
import MixinRoot            from '../../Components/Mixins/Root.vue';
import RootViewComponent    from '../../Components/Views/Root.vue';


/**
 * This service provides a navigation router.
 */
export default class Router extends Service
{
    /**
     * The service name.
     */
    name: string = 'Router';

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
        super();

        this.api = new Api;
        this.translator = new Translator;
    }

    /**
     * Boot the router.
     */
    boot(): void
    {
        let store = StateMachine.getStore();
        let guard = new Guard;
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
            linkActiveClass: Config.app.services.router.linkActiveClass,
            mode : Config.app.services.router.mode,
            routes: [
                {
                    path: '',
                    component: RootViewComponent,
                    meta: {
                        actions: ['view/ROOT']
                    },
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
                                Logger.error('Scroll behaviour failed.');
                                Logger.error(reason);
                                reject(reason);
                                return;
                            }

                            resolve(savedPosition || { x: 0, y: 0 })
                        })
                })
            }
        });

        // Execute the guard before loading each route
        guard.init(router, store)
            .run();

        // Router root component
        let app = new Vue({

            // Bind the router to the root component
            router,

            // Bind the store so that it's available to all children components
            store,

            mixins: [MixinRoot],

            i18n: this.translator.get(),

            // The root `div` is needed in order for the Vue devtools to work properly.
            template: '<div><animated-router-view></animated-router-view></div>'
        });

        app.$mount(Config.appSelector);

        // Synchronize the router with the store. Allows to save the router state in the state
        // machine store.
        sync(store, router);
    }
}
