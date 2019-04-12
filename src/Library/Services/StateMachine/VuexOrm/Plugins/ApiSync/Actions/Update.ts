import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action }        from './Action';
import { Store }         from 'vuex';


/**
 * Update ($update) action.
 */
export class Update extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: UpdateParameters
    ): Promise<ResponseInterface>
    {
        let resource = Update.getResource(store);
        let response = null;

        try {
            response = await resource.update(params.data);
        } catch (error) {
            Update.onError(error, store, params);
            throw error;
        }

        Update.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: UpdateParameters): void
    {
        params.model.update({
            where: response.body.data.id,
            data: response.body.data
        });
    }
}

/**
 * Update action parameters.
 */
export interface UpdateParameters
{
    data: any;
    options: any;
    model: typeof ExtendedModel;
}
