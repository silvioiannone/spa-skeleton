import Vue                   from 'vue';
import { Config as _Config } from '../../../Config';

/**
 * Easily access the SPA-skeleton's configuration from within any component using `$config`.
 */
export function Config(vue: typeof Vue): void
{
    vue.prototype.$config = _Config;
}
