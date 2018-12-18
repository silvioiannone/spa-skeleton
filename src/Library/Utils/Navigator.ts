import Vue               from 'vue';
import Router, { Route } from 'vue-router'
import String            from './String';

/**
 * Providers navigations and routing utilities.
 */
export default class Navigator
{
    /**
     * Vue instance.
     */
    protected vue: Vue;

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
    setInstance(vue: Vue)
    {
        this.vue = vue;
        this.router = this.vue.$router;
        this.route = this.vue.$route;
    }

    /**
     * Set the route.
     */
    setRoute(route: Route): void
    {
        this.route = route;
    }

    /**
     * Go to route.
     *
     * It behaves in the same way as $router.push but keeps the query parameters.
     */
    toAndKeepQuery(path: string): void
    {
        this.router.push({
            path,
            query: this.route.query
        });
    }

    /**
     * Go to the parent route.
     */
    toParent(levels = 1)
    {
        this.router.push({
            path: String.parentPath(this.route.path, levels),
            query: this.route.query
        });
    }
}
