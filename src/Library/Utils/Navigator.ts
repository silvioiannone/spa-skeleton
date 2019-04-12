import Vue               from 'vue';
import Router, { Route } from 'vue-router'
import String            from './String';
import StateMachine      from '../Services/StateMachine';
import Guard             from '../Guard';

/**
 * Providers navigations and routing utilities.
 */
export default class Navigator
{
    /**
     * Vue router.
     */
    protected router: Router;

    /**
     * Vue router's route.
     */
    protected route: Route;

    /**
     * Set the vue instance.
     *
     * @param vue
     */
    public setInstance(vue: Vue): void
    {
        this.router = vue.$router;
        this.route = vue.$route;
    }

    /**
     * Set the route.
     */
    public setRoute(route: Route): void
    {
        this.route = route;
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
    public toParent(levels = 1): void
    {
        this.router.push({
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
}
