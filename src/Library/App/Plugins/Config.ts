import Vue        from 'vue';
import { Config as _Config } from 'spa-skeleton';

/**
 * Easily access the SPA-skeleton's configuration from within any component using `$config`.
 */
export default function Config(vue: typeof Vue): void
{
    vue.prototype.$config = _Config;
}
