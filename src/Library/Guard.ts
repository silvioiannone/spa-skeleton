import { isEqual } from 'lodash';
import Router, { RouteConfig, Route, RouteRecord } from 'vue-router';
import { Store } from 'vuex';
import { VueRouterNext } from './Types/VueRouterNext';
import { StateMachine } from './Services/StateMachine';
import { Logger as Log } from './Services/Logger';
import Guards from '../../../../resources/ts/App/Guards';
import Routes from '../../../../resources/ts/App/Routes';
import { ResponseInterface } from './Api/ResponseInterface';

// Skeleton guards
import { Auth }        from './App/Guards/Auth';
import { UserIsAdmin } from './App/Guards/UserIsAdmin';

const SkeletonGuards = {
    Auth,
    UserIsAdmin
};

/**
 * Router middleware.
 *
 * The purpose of this class is to define and apply the router middleware to each route and
 * retrieve the data needed by each route.
 */
export class Guard
{
    /**
     * Router.
     */
    protected router!: Router;

    /**
     * Router routes.
     */
    protected routes!: RouteConfig[];

    /**
     * State machine store.
     */
    protected store!: Store<any>;

    /**
     * Completed hooks.
     */
    protected completedHooks: any[] = [];

    /**
     * Application readiness according to the guard.
     */
    protected ready: boolean = false;

    /**
     * After error hooks.
     */
    protected static afterErrorHooks: ((response: ResponseInterface) => void)[] = [];

    /**
     * Register a hook that will be called after an error.
     */
    public static afterError(callback: (response: ResponseInterface) => void): void
    {
        Guard.afterErrorHooks.push(callback);
    }

    /**
     * Initializes the guard.
     */
    public init(router: Router): Guard
    {
        this.router = router;
        this.routes = Routes;
        this.store = StateMachine.getStore();

        return this;
    }

    /**
     * Apply the middleware to the router.
     */
    public run(): void
    {
        this.router.beforeEach((to: Route, from: Route, next: VueRouterNext): void => {
            this.beforeRouteLoads(to, from, next);
        });

        this.router.afterEach((to: Route, from: Route): void => {
            this.afterRouteLoads(to, from);
        });
    }

    /**
     * Refresh a route.
     */
    public async refresh(to: Route): Promise<any>
    {
        Log.debug('Loading ' + to.path + '...');

        try {
            await this.runRouteActions(to, to, true);
        } catch (error) {
            this.handleRouteLoadError(error, to);
            throw error;
        }

        try {
            await this.runRouteGuards(to, to);
        } catch (error) {
            this.store.commit('app/SET_STATUS', 'unauthorized');
            throw error;
        }

        this.ready = true;
        this.afterRouteLoads(to, to);
    }

    /**
     * Load a route.
     */
    public async beforeRouteLoads(to: Route, from: Route, next: VueRouterNext): Promise<any>
    {
        Log.debug('Loading ' + to.path + '...');

        this.store.commit('app/SET_STATUS', 'loading');

        // Fetch all the needed data for the current view.
        try {
            await this.runRouteActions(to, from);
        } catch (error) {
            this.handleRouteLoadError(error, to);
            next();
            return;
        }

        // Check if the user is allowed to make the request.
        try {
            await this.runRouteGuards(to, from);
        } catch (error) {
            this.store.commit('app/SET_STATUS', 'unauthorized');
            next();
            return;
        }

        this.ready = true;

        next();
    }

    /**
     * Handle a route action error.
     */
    protected handleRouteLoadError(error: any, to: Route): void
    {
        Log.error('View ' + to.path + ' failed to load.');

        Guard.afterErrorHooks.map((callback: Function): any => callback(error));
    }

    /**
     * Define what to do after a route has been loaded.
     */
    protected afterRouteLoads(to: Route, from: Route): void
    {
        if (! this.ready) {
            return;
        }

        this.store.commit('app/SET_STATUS', 'ready');

        Log.info('Loaded ' + to.path + '.');

        this.storeRoute(from);

        // Execute the completed hooks
        this.router.app.$nextTick((): void => {
            this.completedHooks.forEach((hook): any => hook(to, from));
        });
    }

    /**
     * Save the given route in the route's history in the state machine.
     */
    protected storeRoute(route: Route): void
    {
        // Push the previous route into the state machine.
        let routesHistory = [...this.store.getters.app.router.history];
        let routesHistoryCount = this.store.getters.app.router.historyCount;

        routesHistory.push(route);

        if (routesHistory.length > routesHistoryCount) {
            routesHistory.shift();
        }

        this.store.commit('app/SET', {
            key: 'router.history',
            value: routesHistory
        });
    }

    /**
     * Register a completed hook.
     */
    public onComplete(callback: Function): void
    {
        this.completedHooks.push(callback);
    }

    /**
     * Execute the action for the route we're navigating to.
     *
     * The actions are defined in the views module (library/state/modules/view.js) of the state
     * machine.
     */
    protected async runRouteActions(to: Route, from: Route, refresh: boolean = false): Promise<any>
    {
        Log.debug('Running route actions...');

        let actions: string[] = [];
        let actionPromises: Promise<any>[] = [];
        let fromActions: any[] = [];

        from.matched.forEach((match: RouteRecord): void =>
        {
            if (match.meta.actions) {
                fromActions = fromActions.concat(match.meta.actions)
            }
        });

        to.matched.forEach((match: RouteRecord): void =>
        {
            if (typeof match.meta.actions !== 'undefined') {
                actions = actions.concat(match.meta.actions);
            }
        });

        if (! refresh) {
            // We need to take only the actions that are not already defined by the previous
            // routes.
            actions = actions.filter((action: string): boolean =>
            {
                // Take the action if it's not in the previous route...
                return fromActions.indexOf(action) < 0 ||
                    // ...or if it's the root action...
                    action === 'view/ROOT' ||
                    // ...or if it's the last action that was executed in the previous route but
                    // now we're executing it with different parameters.
                    (fromActions.indexOf(action) === actions.length - 1 &&
                        ! isEqual(to.query, from.query))
            });
        }

        Log.debug('Executing actions: ' + actions.join(', ') + '.');

        actions.forEach((action: string): void =>
        {
            actionPromises.push(this.store.dispatch(action, {
                vue: this.store,
                route: to
            }));
        });

        try {
            await Promise.all(actionPromises);
        } catch (error) {
            Log.error('One or more actions failed executing.');
            throw error;
        }
    }

    /**
     * Executes the guards for the specified route.
     */
    protected async runRouteGuards(to: Route, from: Route): Promise<any>
    {
        Log.debug('Running route guards...');

        let guards: string[] = [];
        let guardPromises: Promise<any>[] = [];

        to.matched.forEach((match): void => {
            if (typeof match.meta.guards !== 'undefined') {
                guards = guards.concat(match.meta.guards);
            }
        });

        let availableGuards = {...SkeletonGuards, ...Guards};

        guards.forEach((guard): void => {
            if (! availableGuards[guard]) {
                throw 'The guard ' + guard + ' doesn\'t exist.';
            }
            let guardPromise = new availableGuards[guard](this.store).execute();

            guardPromise.catch((error: any): void => {
                Log.error('The guard ' + guard + ' blocked the loading of the view.');
                Log.error(error);
            });

            guardPromises.push(guardPromise);
        });

        await Promise.all(guardPromises);
    }
}
