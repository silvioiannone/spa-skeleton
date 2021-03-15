import Vue from 'vue';
import { Response } from '../../Utils/Response';
import { String } from '../../Utils/String';
import { Arr } from '../../Utils/Array';

/**
 * This plugin exports a series of utilities that can be quickly accessed using `this.$utils`.
 */
export function Utils(vue: typeof Vue): void
{
    vue.prototype.$utils = {
        response: Response,
        string: String,
        array: Arr
    };
}
