import _             from 'lodash';
import Vue           from 'vue';
import Router, {
    RouteConfig,
    Route,
    RouteRecord,
    RawLocation }    from 'vue-router';
import { Store }     from 'vuex';
import Log           from '../Services/Logger';
import Guards        from '../../../../../resources/ts/App/Guards';
import Routes        from '../../../../../resources/ts/App/Routes';

// Skeleton guards
import Auth        from './Guards/Auth';
import UserIsAdmin from './Guards/UserIsAdmin';

const SkeletonGuards = {
    Auth,
    UserIsAdmin
}

/**
 * Router middleware.
 *
 * The purpose of this class is to define and apply the router middlewares to each route and
 * retrieve the data needed by each route.
 */
export default class Guard
{
    /**
     * Router.
     */
    protected router: Router;

    /**
     * Router routes.
     */
    protected routes: Array<RouteConfig>;

    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Completed hooks.
     */
    protected completedHooks: Array<any> = [];

    /**
     * Initializes the guard.
     */
    init(router: Router, store: Store<any>): Guard
    {
        this.router = router;
        this.routes = Routes;
        this.store = store;

        return this;
    }

    /**
     * Apply the middleware to the router.
     */
    run(): void
    {
        let ready = true;

        this.router.beforeEach((
            to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) =>
        {
            ready = true;
            Log.debug('Loading ' + to.path + '...');

            this.store.commit('app/SET_STATUS', 'loading');

            // Fetch all the needed data for the current view
            this.runRouteActions(to, from)
                .then(() =>
                {
                    // Once all the data has been loaded run the guards
                    this.runRouteGuards(to, from)
                        .then(() => {
                            this.store.commit('app/SET_STATUS', 'ready');
                            next();
                        })
                        .catch(error =>
                        {
                            this.store.commit('app/SET_STATUS', 'unauthorized');
                            ready = false;
                            next();
                        });
                })
                .catch((error: any) =>
                {
                    ready = false;

                    this.store.commit('app/SET_ERROR', error);

                    if(error.statusCode === 401) {
                        this.store.commit('app/SET_STATUS', 'unauthorized');
                        next();
                        return;
                    }

                    if(error.statusCode === 404) {
                        this.store.commit('app/SET_STATUS', 'notFound');
                        next();
                        return;
                    }

                    if(error.statusCode === 503) {
                        this.store.commit('app/SET_STATUS', 'serviceUnavailable');
                        next();
                        return;
                    }

                    Log.error('View ' + to.path + ' failed to load.');
                    Log.error(error);

                    this.store.commit('app/SET_STATUS', 'error');
                    next();
                });
        });

        this.router.afterEach((to: Route, from: Route) =>
        {
            if (ready) {
                this.store.commit('app/SET_STATUS', 'ready');

                Log.info('Loaded ' + to.path + '.');
            }

            // Execute the completed hooks
            this.router.app.$nextTick(() =>
            {
                this.completedHooks.forEach(hook => hook(to, from));
            })
        });
    }

    /**
     * Register a completed hook.
     */
    onComplete(callback: Function): void
    {
        this.completedHooks.push(callback);
    }

    /**
     * Execute the action for the route we're navigating to.
     *
     * The actions are defined in the views module (library/state/modules/view.js) of the state
     * machine.
     *
     * @protected
     */
    protected runRouteActions(to: Route, from: Route): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            let actions: Array<String> = [];
            let actionPromises: Array<Promise<any>> = [];
            let fromActions: Array<any> = [];

            from.matched.forEach((match: RouteRecord) =>
            {
                if (match.meta.actions) {
                    fromActions = fromActions.concat(match.meta.actions)
                }
            });

            to.matched.forEach((match: RouteRecord) =>
            {
                if (typeof match.meta.actions !== 'undefined') {
                    actions = actions.concat(match.meta.actions);
                }
            });

            // We need to take only the actions that are not already defined by the previous routes.
            actions = actions.filter((action: string) =>
            {
                // Take the action if it's not in the previous route...
                return fromActions.indexOf(action) < 0 ||
                    // ...or if it's the root action...
                    action === 'view/ROOT' ||
                    // ...or if it's the last action that was executed in the previous route but now
                    // we're executing it with different parameters.
                    (fromActions.indexOf(action) === actions.length - 1 &&
                        ! _.isEqual(to.query, from.query))
            });

            Log.debug('Executing actions: ' + actions.join(', ') + '.');

            actions.forEach((action: string) =>
            {
                actionPromises.push(this.store.dispatch(action, {
                    vue: this.store,
                    route: to
                }));
            });

            Promise.all(actionPromises)
                .then(() =>
                {
                    resolve();
                    Log.debug('Actions executed.');
                })
                .catch((error: any) => reject(error))
        });
    }

    /**
     * Executes the guards for the specified route.
     */
    protected runRouteGuards(to: Route, from: Route): Promise<any>
    {
        let guards: Array<string> = [];
        let guardPromises: Array<Promise<any>> = [];

        to.matched.forEach(match =>
        {
            if (typeof match.meta.guards !== 'undefined') {
                guards = guards.concat(match.meta.guards);
            }
        });

        let availableGuards = {...SkeletonGuards, ...Guards};

        guards.forEach(guard =>
        {
            if (! availableGuards[guard]) {
                throw 'The guard ' + guard + ' doesn\'t exist.';
            }
            let guardPromise = new availableGuards[guard](this.store).execute();

            guardPromise.catch((error: any) =>
            {
                Log.error('The guard ' + guard + ' blocked the loading of the view.');
                console.error(error);
            });

            guardPromises.push(guardPromise);
        });

        return new Promise((resolve, reject) =>
        {
            Promise.all(guardPromises)
                .then(() => resolve())
                .catch((error: any) => reject(error));
        });
    }
}
