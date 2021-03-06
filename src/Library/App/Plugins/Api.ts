import Vue            from 'vue';
import { ApiFactory } from '../../Api';

/**
 * This plugin makes available the api client to every component.
 *
 * The client API will be accessible using `this.$api` in any component.
 */
export function Api(vue: typeof Vue): void
{
    vue.prototype.$api = ApiFactory.make();
}
