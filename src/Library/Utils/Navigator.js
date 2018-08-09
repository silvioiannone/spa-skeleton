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
     * Go to the parent route.
     *
     * @param [levels] {Number}
     */
    toParent(levels)
    {
        levels = levels || 1;

        this.router.push(String.parentPath(this.route.path, levels));
    }
}
