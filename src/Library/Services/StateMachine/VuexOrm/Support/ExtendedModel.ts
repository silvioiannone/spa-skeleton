import { Model } from '@vuex-orm/core';

/**
 * This class provides support for the ApiSync plugin.
 */
export class ExtendedModel extends Model
{
    /**
     * Get the model(s) from the server and stores it in the state machine.
     * @param id
     * @param options
     */
    static async $get(id: string = '', options: any = null): Promise <any>
    {
        return this.dispatch('$get', {
            id,
            options,
            model: this
        });
    }
}
