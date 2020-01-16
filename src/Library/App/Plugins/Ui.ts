import Vue from 'vue';
import { Toolbar } from '../../Utils/Ui/Toolbar';

/**
 * UI vue plugin.
 */
export function Ui(vue: typeof Vue): void
{
    vue.prototype.$ui = {
        toolbar: Toolbar
    }
}
