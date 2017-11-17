/**
 * This plugin makes available the api client to every component.
 *
 * The client API will be accessible using `this.$api` in any component.
 */

import API from '../../API';

export default
{
    install(Vue, options)
    {
        Vue.prototype.$api = new API;
    }
}
