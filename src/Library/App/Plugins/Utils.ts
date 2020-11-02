import Vue from 'vue';
import { String } from '../../Utils/String'

/**
 * This plugin exports a series of utilities that can be quickly accessed using `this.$utils`.
 */
export function Utils(vue: typeof Vue): void
{
    vue.prototype.$utils = {
        string: String
    };
}