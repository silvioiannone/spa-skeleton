import Vue                              from 'vue';
import { WebSocket as WebSocketClient } from '../../WebSocket';

/**
 * This plugin makes available the WebSocket client library available to Vue as a plugin.
 *
 * It's possible to access the WebSocket client by simply referring to "this.$ws" from inside any
 * component.
 */
export function WebSocket(vue: typeof Vue): void
{
    // We need to bind the WebSocket client library to the Vue instance so that it's available
    // as long as the app runs.
    vue.prototype.$ws = new WebSocketClient;
};
