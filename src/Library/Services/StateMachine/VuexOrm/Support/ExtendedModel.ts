import { Model }            from '@vuex-orm/core';
import ResponseInterface    from '../../../../Api/ResponseInterface';
import { CreateParameters } from '../Plugins/ApiSync/Actions/Create';
import { GetParameters }    from '../Plugins/ApiSync/Actions/Get';
import { UpdateParameters } from '../Plugins/ApiSync/Actions/Update';
import { DeleteParameters } from '../Plugins/ApiSync/Actions/Delete';
import { ApiClient,
    default as ApiFactory } from '../../../../Api';

/**
 * This class provides support for the ApiSync plugin.
 */
export class ExtendedModel extends Model
{
    /**
     * Create the model on the server and the state machine.
     */
    static async $create(
        data: any = '',
        options: CreateParameters | null = null): Promise<ResponseInterface>
    {
        return this.dispatch('$create', {
            data,
            options,
            model: this
        });
    }

    /**
     * Delete the model on the server and the state machine.
     */
    static async $delete(
        data: any = '',
        options: DeleteParameters | null = null): Promise<ResponseInterface>
    {
        return this.dispatch('$delete', {
            data,
            options,
            model: this
        });
    }

    /**
     * Get the model(s) from the server and stores it in the state machine.
     */
    static async $get(
        id: string = '',
        options: GetParameters | null = null): Promise <ResponseInterface>
    {
        return this.dispatch('$get', {
            id,
            options,
            model: this
        });
    }

    /**
     * Update the model on the server and the state machine.
     */
    static async $update(
        data: any = '',
        options: UpdateParameters | null = null): Promise<ResponseInterface>
    {
        return this.dispatch('$update', {
            data,
            options,
            model: this
        });
    }

    /**
     * Make an API call.
     */
    static async api(
        execute: (client: ApiClient) => Promise<ResponseInterface>
    ): Promise<ResponseInterface>
    {
        let api = ApiFactory.make();
        let promise = execute(api);

        promise.then(response =>
        {
            if (response.body.meta) {
                ExtendedModel.store()
                   .commit('app/insert', {
                       ui: {
                           pagination: response.body.meta
                       }
                   });
            }
        });

        return promise;
    }
}
