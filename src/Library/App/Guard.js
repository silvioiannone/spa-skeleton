import Log    from 'loglevel';
import Guards from 'assets/js/App/Guards';

// Skeleton guards
import Auth from './Guards/Auth';
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
    constructor()
    {
        // The router
        this.router = null;

        // The routes containing also the guard definitions
        this.routes = null;

        // The state machine store
        this.store = null;

        // Completed hooks
        this.completedHooks = [];
    }

    /**
     * Initializes the guard.
     *
     * @param router A vue router instance.
     * @param store Store instance.
     */
    init(router, store)
    {
        this.router = router;
        this.routes = router.options.routes;
        this.store = store;

        return this;
    }

    /**
     * Apply the middleware to the router.
     */
    run()
    {
        let ready = true;

        this.router.beforeEach((to, from, next) =>
        {
            ready = true;
            Log.debug('Loading ' + to.path + '...');

            this.store.commit('app/SET_STATUS', 'loading');

            // Fetch all the needed data for the current view
            this.runRouteActions(to)
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
                            this.store.commit('app/SET_STATUS', 'error');
                            ready = false;
                            next();
                        });
                })
                .catch(error =>
                {
                    ready = false;

                    this.store.commit('app/SET_ERROR', error);

                    if(error.statusCode === 401) {
                        this.store.commit('app/SET_STATUS', 'unauthenticated');
                        next();
                        return;
                    }

                    if(error.statusCode === 404) {
                        this.store.commit('app/SET_STATUS', 'notFound');
                        next();
                        return;
                    }

                    Log.error('View ' + to.path + ' failed to load.');
                    Log.error(error);

                    this.store.commit('app/SET_STATUS', 'error');
                    next();
                });
        });

        this.router.afterEach((to, from) =>
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
     *
     * @param callback
     */
    onComplete(callback)
    {
        this.completedHooks.push(callback);
    }

    /**
     * Execute the action for the route we're navigating to.
     *
     * The actions are defined in the views module (library/state/modules/view.js) of the state
     * machine.
     *
     * @param {Object} to
     * @return {Promise}
     * @protected
     */
    runRouteActions(to)
    {
        return new Promise((resolve, reject) =>
        {
            let matched = this.router.matcher.match(this.routes, to).matched;
            let actions = [];
            let actionPromises = [];

            matched.forEach(match =>
            {
                if (typeof match.meta.actions !== 'undefined') {
                    actions = actions.concat(match.meta.actions);
                }
            });

            Log.debug('Executing actions: ' + actions.join(', ') + '.');

            actions.forEach(action =>
            {
                actionPromises.push(this.store.dispatch(action, {
                    vue: this.store,
                    route: to
                }));
            });

            Promise.all(actionPromises)
                .then(() => {
                    resolve();
                    Log.debug('Actions executed.');
                })
                .catch(error => reject(error))
        });
    }

    /**
     * Executes the guards for the specified route.
     *
     * @param {Object} to
     * @param {Object} from
     * @return {Promise}
     * @protected
     */
    runRouteGuards(to, from)
    {
        let matched = this.router.matcher.match(this.routes, to).matched;
        let guards = [];
        let guardPromises = [];
        let availableGuards = {};

        matched.forEach(match =>
        {
            if (typeof match.meta.guards !== 'undefined') {
                guards = guards.concat(match.meta.guards);
            }
        });

        Object.assign(availableGuards, SkeletonGuards, Guards);

        guards.forEach(guard =>
        {
            let guardPromise = new availableGuards[guard](this.store).execute();

            guardPromise.catch(error =>
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
                .catch(error => reject(error));
        });
    }
}
