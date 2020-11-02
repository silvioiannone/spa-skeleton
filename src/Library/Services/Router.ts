import Vue                           from 'vue';
import VueRouter, { Route }          from 'vue-router';
import { sync }                      from 'vuex-router-sync';
import { ApiFactory as Api }         from '../Api';
import { Config }                    from '../../Config';
import { Guard }                     from '../Guard';
import { Logger }                    from './Logger';
import { Service }                   from './Service';
import { Translator }                from './Translator';
import Routes                        from '../../../../../resources/ts/App/Routes';
import { StateMachine }              from './StateMachine';
import { Root as MixinRoot }         from '../../Components/Mixins/Root.vue';
import { Plugins }                   from './Plugins';

/**
 * This service provides a navigation router.
 */
export class Router extends Service
{
    /**
     * The service name.
     */
    public name: string = 'Router';

    /**
     * API client.
     */
    protected api: Api;

    /**
     * Current router instance.
     */
    protected static instance: VueRouter;

    /**
     * Constructor.
     */
    public constructor()
    {
        super();

        this.api = new Api;
    }

    /**
     * Get the current router instance.
     */
    public static getInstance(): VueRouter
    {
        return Router.instance;
    }

    /**
     * Boot the router.
     */
    public static boot(): void
    {
        let store = StateMachine.getStore();
        let guard = new Guard;
        let scrollPromise = new Promise((resolve: Function): void =>
        {
            guard.onComplete((to: Route): void =>
            {
                if (to.hash) {
                    resolve({ selector: to.hash });
                    return;
                }

                resolve({});
            });
        });

        // Create a new router instance
        Router.instance = new VueRouter({
            linkActiveClass: Config.app.services.router.linkActiveClass,
            mode : Config.app.services.router.mode,
            routes: Routes,
            async scrollBehavior(to: Route, from: Route, savedPosition: any): Promise<any>
            {
                return new Promise(async (resolve, reject): Promise<any> =>
                {
                    try {
                        await scrollPromise;
                    } catch (error) {
                        if (error !== {}) {
                            Logger.error('Scroll behaviour failed.');
                            Logger.error(error);
                            reject(error);
                            return;
                        }

                        resolve(savedPosition || { x: 0, y: 0 });
                        return;
                    }

                    // The timeout is needed because we need to wait for the view animation to
                    // finish.
                    setTimeout((): void => resolve(), 500);
                })
            }
        });

        // Execute the guard before loading each route
        guard.init(Router.instance, store)
            .run();

        // Router root component
        let app = new Vue({

            // Bind the router to the root component
            router: Router.instance,

            // Bind the store so that it's available to all children components
            store,

            mixins: [MixinRoot],

            // TODO: check if this is still needed.
            i18n: Translator.get(),

            vuetify: Plugins.getVuetify(),

            // The root `div` is needed in order for the Vue devtools to work properly.
            template: '<div><animated-router-view></animated-router-view></div>'
        });

        app.$mount(Config.appSelector);

        // Synchronize the router with the store. Allows to save the router state in the state
        // machine store.
        sync(store, Router.instance);
    }
}
