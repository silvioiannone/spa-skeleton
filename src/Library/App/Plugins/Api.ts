import Vue        from 'vue';
import ApiFactory from '../../Api';

/**
 * This plugin makes available the api client to every component.
 *
 * The client API will be accessible using `this.$api` in any component.
 */
export default function Api(vue: typeof Vue, options?: any): void
{
    vue.prototype.$api = ApiFactory.make();
}
