import Navigator from '../../Utils/Navigator';

/**
 * This plugin adds some navigation utilities to view.
 */
export default
{
    install(Vue, options)
    {
        let navigator = new Navigator();

        // Make sure that the navigator always have an updated router and route by using vue-router
        // hooks.
        Vue.mixin({
            beforeRouteUpdate: (to, from, next) => {
                navigator.setRoute(to);
                next();
            },
            beforeRouteEnter: (to, from, next) => {
                next(vm => {
                    navigator.setInstance(vm);
                });
            }
        })

        Vue.prototype.$navigator = navigator;
    }
}
