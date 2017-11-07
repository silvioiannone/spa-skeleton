/**
 * This plugin makes available the an event hub that can be used to send events across totally
 * unrelated components.
 *
 * It's possible to access the event hub using "this.$eh" from inside any component.
 */
export default
{
    install(Vue, options)
    {
        // We need to bind the WebSocket client library to the Vue instance so
        // that it's available as long as the app runs.
        Vue.prototype.$eh = new Vue();
    }
};