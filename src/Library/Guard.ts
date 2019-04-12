import _                 from 'lodash';
import Vue               from 'vue';
import Router, {
    RouteConfig,
    Route,
    RouteRecord,
    RawLocation }        from 'vue-router';
import { Store }         from 'vuex';
import Log               from './Services/Logger';
import Guards            from '../../../../resources/ts/App/Guards';
import Routes            from '../../../../resources/ts/App/Routes';
import ResponseInterface from './Api/ResponseInterface';

// Skeleton guards
import Auth        from './App/Guards/Auth';
import UserIsAdmin from './App/Guards/UserIsAdmin';

const SkeletonGuards = {
    Auth,
    UserIsAdmin
};

type VueRouterNext = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void;

/**
 * Router middleware.
 *
 * The purpose of this class is to define and apply the router middleware to each route and
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
    protected routes: RouteConfig[];

    /**
     * State machine store.
     */
    protected store: Store<any>;

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
     * Register an hook that will be called after an error.
     */
    public static afterError(callback: (response: ResponseInterface) => void): void
    {
        Guard.afterErrorHooks.push(callback);
    }

    /**
     * Initializes the guard.
     */
    public init(router: Router, store: Store<any>): Guard
    {
        this.router = router;
        this.routes = Routes;
        this.store = store;

        return this;
    }

    /**
     * Apply the middleware to the router.
     */
    public run(): void
    {
        this.router.beforeEach((to: Route, from: Route, next: VueRouterNext): void =>
        {
            this.beforeRouteLoads(to, from, next);
        });

        this.router.afterEach((to: Route, from: Route): void =>
        {
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
            this.handleRouteActionError(error, to);
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
            this.ready = false;
            this.handleRouteActionError(error, to, next);
            next(error);
            return;
        }

        // Once all the data has been loaded run the guards.
        try {
            await this.runRouteGuards(to, from);
        } catch (error) {
            this.store.commit('app/SET_STATUS', 'unauthorized');
            this.ready = false;
            next(error);
            return;
        }

        this.store.commit('app/SET_STATUS', 'ready');
        next();
    }

    /**
     * Handle a route action error.
     */
    protected handleRouteActionError(error: any, to: Route, next?: Function): void
    {
        Log.error('View ' + to.path + ' failed to load.');
        Log.error(error);

        Guard.afterErrorHooks.map((callback: Function): any => callback(error));

        if (next) {
            next(error);
        }
    }

    /**
     * Define what to do after a route has been loaded.
     */
    protected afterRouteLoads(to: Route, from: Route): void
    {
        if (this.ready) {
            this.store.commit('app/SET_STATUS', 'ready');

            Log.info('Loaded ' + to.path + '.');
        }

        // Execute the completed hooks
        this.router.app.$nextTick((): void =>
        {
            this.completedHooks.forEach((hook): any => hook(to, from));
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
                        ! _.isEqual(to.query, from.query))
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
        let guards: string[] = [];
        let guardPromises: Promise<any>[] = [];

        to.matched.forEach((match): void =>
        {
            if (typeof match.meta.guards !== 'undefined') {
                guards = guards.concat(match.meta.guards);
            }
        });

        let availableGuards = {...SkeletonGuards, ...Guards};

        guards.forEach((guard): void =>
        {
            if (! availableGuards[guard]) {
                throw 'The guard ' + guard + ' doesn\'t exist.';
            }
            let guardPromise = new availableGuards[guard](this.store).execute();

            guardPromise.catch((error: any): void =>
            {
                Log.error('The guard ' + guard + ' blocked the loading of the view.');
                console.error(error);
            });

            guardPromises.push(guardPromise);
        });

        await Promise.all(guardPromises);
    }
}
