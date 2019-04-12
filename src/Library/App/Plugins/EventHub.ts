import Vue from 'vue';

/**
 * This plugin makes available the an event hub that can be used to send events across totally
 * unrelated components.
 *
 * It's possible to access the event hub using "this.$eh" from inside any component.
 */
export default function EventHub(vue: typeof Vue): void
{
    // We need to bind the WebSocket client library to the Vue instance so
    // that it's available as long as the app runs.
    vue.prototype.$eh = new Vue();
}
