import { Model }                  from '@vuex-orm/core';
import { ResponseInterface }      from '../../../../Api/ResponseInterface';
import { CreateParameters }       from '../Plugins/ApiSync/Actions/Create';
import { GetParameters }          from '../Plugins/ApiSync/Actions/Get';
import { UpdateParameterOptions } from '../Plugins/ApiSync/Actions/Update';
import { DeleteParameters }       from '../Plugins/ApiSync/Actions/Delete';
import { ApiClient, ApiFactory }  from '../../../../Api';
import { Pagination }             from '../../../../Utils/Pagination';

/**
 * This class provides support for the ApiSync plugin.
 */
export class ExtendedModel extends Model
{
    /**
     * Create the model on the server and the state machine.
     */
    public static async $create(
        data: any = '',
        options?: CreateParameters
    ): Promise<ResponseInterface>
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
    public static async $delete(
        data: any = '',
        options?: DeleteParameters
    ): Promise<ResponseInterface>
    {
        return this.dispatch('$delete', {
            data,
            options,
            model: this
        });
    }

    /**
     * Get the model(s) from the server and store it in the state machine.
     */
    public static async $get(
        id: string | number = '',
        options?: GetParameters
    ): Promise <ResponseInterface>
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
    public static async $update(
        data: any = '',
        options?: UpdateParameterOptions
    ): Promise<ResponseInterface>
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
    public static async api(
        execute: (client: ApiClient) => Promise<ResponseInterface>
    ): Promise<ResponseInterface>
    {
        let api = ApiFactory.make();

        let response = await execute(api);

        this.handleApiResponse(response);

        return response;
    }

    /**
     * Handle an API response.
     */
    protected static handleApiResponse(response: ResponseInterface): void
    {
        if (response?.body?.meta) {
            ExtendedModel.store()
                .commit('app/INSERT', {
                    ui: {
                        pagination: Pagination.makeFromResponse(response)
                    }
                });
        }
    }
}
