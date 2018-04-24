import Log       from 'loglevel';
import API       from '../API';
import Config    from '../../Config';
import Guard     from './Guard';
import MixinRoot from '../../Components/Mixins/Root.vue';
import Routes    from 'assets/js/App/Routes';
import VueRouter from 'vue-router';
import { sync }  from 'vuex-router-sync';

/**
 * Application router.
 */
export default class Router
{
    /**
     * @param vue Vue instance.
     */
    constructor(vue)
    {
        this.vue = vue;
        this.api = new API;
    }

    /**
     * Set the translator.
     *
     * @param translator
     * @return {Router}
     */
    translator(translator)
    {
        this.translator = translator;

        return this;
    }

    /**
     * Boot the router.
     */
    boot(store)
    {
        Log.debug('Booting router...');

        let guard = new Guard();
        let scrollPromise = new Promise((resolve, reject) =>
        {
            guard.onComplete((to, from) =>
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
                    component: {
                        template: '<router-view></router-view>',
                        name: 'RootRouterView'
                    },
                    children: Routes
                }
            ],
            scrollBehavior(to, from, savedPosition)
            {
                return new Promise((resolve, reject) =>
                {
                    scrollPromise
                        .then(solution => {
                            // The timeout is needed because we need to wait for the view animation
                            // to finish.
                            setTimeout(() => resolve(solution), 500);
                        })
                        .catch(reason => {
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
        let app = new this.vue({

            // Bind the router to the root component
            router,

            // Bind the store so that it's available to all children components
            store,

            mixins: [MixinRoot],

            i18n: this.translator,

            // The root `div` is needed in order for the Vue devtools to work properly.
            template: '<div><animated-router-view></animated-router-view></div>'
        });

        app.$mount(Config.appSelector);

        // Synchronize the router with the store. Allows to save the router state in the state
        // machine store.
        sync(store, router);

        Log.debug('Router ready.');
    }
}
