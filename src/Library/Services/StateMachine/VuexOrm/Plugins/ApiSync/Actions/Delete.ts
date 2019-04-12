import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action }        from './Action';
import { Store }         from 'vuex';


/**
 * Delete ($delete) action.
 */
export class Delete extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: DeleteParameters
    ): Promise<ResponseInterface>
    {
        let resource = Delete.getResource(store);
        let response = null;

        try {
            response = await resource.delete(params.data)
        } catch (error) {
            Delete.onError(error, store, params);
            throw error;
        }

        Delete.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: DeleteParameters
    ): void
    {
        params.model.delete({
            where: response.body.data.id
        });
    }
}

/**
 * Delete action parameters.
 */
export interface DeleteParameters
{
    data: any;
    options: any;
    model: typeof ExtendedModel;
}
