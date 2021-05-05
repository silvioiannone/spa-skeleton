import Vue                            from 'vue';
import Router, { Route, RawLocation } from 'vue-router'
import { String }                     from './String';
import { StateMachine }               from '../Services/StateMachine';
import { Guard }                      from '../Guard';

/**
 * Providers navigations and routing utilities.
 */
export class Navigator
{
    /**
     * Vue router.
     */
    protected router!: Router;

    /**
     * Current route.
     */
    protected route!: Route;

    /**
     * Previous route.
     */
    protected fromRoute!: Route;

    /**
     * Set the vue instance.
     *
     * @param vue
     */
    public setInstance(vue: Vue): void
    {
        if (vue.$router) {
            this.router = vue.$router;
        }

        if (vue.$route) {
            this.route = vue.$route;
        }
    }

    /**
     * Set the route.
     */
    public setRoute(route: Route): void
    {
        this.route = route;
    }

    /**
     * Set the previous route.
     */
    public setFromRoute(route: Route): void
    {
        this.fromRoute = route;
    }

    /**
     * Go to route.
     *
     * It behaves in the same way as $router.push but keeps the query parameters.
     */
    public toAndKeepQuery(path: string): void
    {
        this.router.push({
            path,
            query: this.route.query
        });
    }

    /**
     * Go to the parent route.
     */
    public toParent(levels: number = 1): void
    {
        this.push({
            path: String.parentPath(this.route.path, levels),
            query: this.route.query
        });
    }

    /**
     * Refresh the current route.
     */
    public refresh(): void
    {
        // In order to refresh the current route we just need to execute the view actions.
        (new Guard).init(this.router, StateMachine.getStore())
            .refresh(this.route);
    }

    /**
     * Navigate to a new route.
     */
    public async push(location: RawLocation): Promise<Route|void>
    {
        let result;

        try {
            result = await this.router.push(location);
        } catch (error) {
            if (error.toString().includes('Avoided redundant navigation')) {
                return new Promise((): void => {});
            }

            throw error;
        }

        return result;
    }

    /**
     * Navigate back.
     */
    public back(): void
    {
        history.back();
    }

    /**
     * Navigate back if possible. If not navigate to the given path or execute a callback.
     */
    public async backOr(pathOrCallback: string|Function): Promise<void>
    {
        if (typeof pathOrCallback === 'function') {
            pathOrCallback();
            return;
        }

        let history = (StateMachine.getStore()).getters.app.router.history.reverse()
            .filter((route: Route): boolean => {
                // Skip the root route.
                return route.path !== '/';
            });

        if (history.length) {
            this.back();
            return;
        }

        await this.push(pathOrCallback);
    }

    /**
     * Navigate back if possible or, if not, to a parent route.
     */
    public async backOrToParent(levels: number = 1): Promise<void>
    {
        return this.backOr(() => this.toParent(levels));
    }
}
