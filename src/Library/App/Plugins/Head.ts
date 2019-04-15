import Vue                  from 'vue';
import { Head as HeadUtil } from '../../Utils/Head';

/**
 * This plugin makes available the head util which can be used to set the head tags content (such as
 * title, meta and so on...).
 *
 * It's possible to access the event hub using "this.$head" from inside any component.
 */
export function Head(vue: typeof Vue): void
{
    vue.prototype.$head = HeadUtil;
}
