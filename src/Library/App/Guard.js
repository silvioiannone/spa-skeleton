import Log         from 'loglevel';
import RouteParser from 'route-parser';
import Guards      from 'assets/js/App/Guards';

// Skeleton guards
import Auth from './Guards/Auth';

const SkeletonGuards = {
    Auth
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
     * Constructor.
     *
     * @param router A vue router instance.
     * @param store Store instance.
     */
    constructor(router, store)
    {
        // The router
        this.router = router;

        // The routes containing also the guard definitions
        this.routes = router.options.routes;

        // The state machine store
        this.store = store;
    }

    /**
     * Apply the middleware to the router.
     */
    run()
    {
        this.router.beforeEach((to, from, next) =>
        {
            Log.debug('Loading ' + to.path + '...');

            this.store.commit('app/SET_STATE_LOADING');

            // Fetch all the needed data for the current view
            this.runRouteActions(to)
                .then(() =>
                {
                    // Once all the data has been loaded run the guards
                    this.runRouteGuards(to, from)
                        .then(() => next())
                        .catch(error =>
                        {
                            this.router.replace('/error/unauthorized');
                        });
                })
                .catch(error =>
                {
                    if(error.statusCode === 401)
                    {
                        this.router.replace('/error/unauthorized');
                        return;
                    }

                    this.router.replace('/error/serverError');

                    Log.error('View ' + to.path + ' failed to load.');
                    Log.error(error);
                });
        });

        this.router.afterEach((to, from) =>
        {
            this.store.commit('app/SET_STATE_READY');

            Log.info('Loaded ' + to.path + '.');
        });
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
            let actions = this.buildActionsList(to.path);
            let actionPromises = [];

            actions.forEach(action =>
            {
                actionPromises.push(this.store.dispatch(action, {
                    vue: this.store,
                    route: to
                }));
            });

            Promise.all(actionPromises)
                .then(() => resolve())
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
        let guards = this.buildGuardsList(to.path);
        let guardPromises = [];
        let availableGuards = {};
        Object.assign(availableGuards, SkeletonGuards, Guards);

        guards.forEach(guard =>
        {
            guardPromises.push(new availableGuards[guard](this.store).execute());
        });

        return new Promise((resolve, reject) =>
        {
            Promise.all(guardPromises)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }

    /**
     * Build a list of actions that needs to be run for the current route.
     *
     * @param {String} targetPath
     * @return {*}
     */
    buildActionsList(targetPath)
    {
        return this.r_buildRouterPropertyList('actions', this.routes, targetPath);
    }

    /**
     * Build a list of guards that needs to be run for the current route.
     *
     * @param {String} targetPath
     * @protected
     */
    buildGuardsList(targetPath)
    {
        return this.r_buildRouterPropertyList('guards', this.routes, targetPath);
    }

    /**
     * Recursively build the list of specified properties set in the router.
     *
     * This can be used to retrieve a liest of guards or a list of actions from the routes
     * structure.
     *
     * @param {String} property
     * @param {Array} routes
     * @param {String} targetPath
     * @param {String} [basePath]
     * @protected
     */
    r_buildRouterPropertyList(property, routes, targetPath, basePath)
    {
        basePath = basePath || '';

        let items = [];
        let self = this;

        routes.forEach(route =>
        {
            let currentPath = basePath + route.path;
            let routeParser = RouteParser(currentPath + '(/*a)');

            // The following condition is needed in order to make sure that the default "path: ''"
            // in the routes definition is also matched. So for example when visiting /home/deal/1
            // even if the last match is reached (/home/deal/:id) is reached we go one level deeper
            // in order to fetch the action for the children "path: ''".
            //
            // It's easier to just give a look to the routes definition file.
            if(!routeParser.match(targetPath) && !routeParser.match(targetPath + '/'))
            {
                return false;
            }

            // Add the found guards
            if(route[property])
            {
                items = items.concat(route[property]);
            }

            // If there are other children...
            if(route.children)
            {
                // ...go deeper
                items = items.concat(self.r_buildRouterPropertyList(
                    property, route.children, targetPath, currentPath + '/'
                ));
            }
        });

        return items;
    }
}
