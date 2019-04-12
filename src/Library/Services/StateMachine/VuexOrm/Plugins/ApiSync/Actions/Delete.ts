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
    public static execute(store: Store<any>, params: DeleteParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function): void =>
        {
            let resource = Delete.getResource(store);

            resource.delete(params.data)
                .then((response: ResponseInterface): void =>
                {
                    Delete.onSuccess(response, store, params);
                    resolve(response);
                })
                .catch((response: ResponseInterface): void =>
                {
                    Delete.onError(response, store, params);
                    reject(response);
                });
        });
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
