import String from './String';

/**
 * Providers navigations and routing utilities.
 */
export default class Navigator
{
    /**
     * Set the vue instance.
     *
     * @param vue
     */
    setInstance(vue)
    {
        this.vue = vue;
        this.router = this.vue.$router;
        this.route = this.vue.$route;
    }

    /**
     * Set the route.
     *
     * @param route
     */
    setRoute(route)
    {
        this.route = route;
    }

    /**
     * Go to route.
     *
     * It behaves in the same way as $router.push but keeps the query parameters.
     *
     * @param path
     */
    toAndKeepQuery(path)
    {
        this.router.push({
            path,
            query: this.route.query
        });
    }

    /**
     * Go to the parent route.
     *
     * @param [levels] {Number}
     */
    toParent(levels)
    {
        levels = levels || 1;

        this.router.push({
            path: String.parentPath(this.route.path, levels),
            query: this.route.query
        });
    }
}
