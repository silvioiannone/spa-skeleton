import Navigator from '../../Utils/Navigator';

/**
 * This plugin adds some navigation utilities to view.
 */
export default
{
    install(Vue, options)
    {
        let navigator = new Navigator();

        // Set the vue instance inside the navigator.
        Vue.mixin({
            created: function () {
                navigator.setInstance(this);
            }
        })

        Vue.prototype.$navigator = navigator;
    }
}
