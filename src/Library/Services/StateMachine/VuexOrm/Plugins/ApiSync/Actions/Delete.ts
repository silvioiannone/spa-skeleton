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
    static execute(store: Store<any>, params: DeleteParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let resource = Delete.getResource(store);

            resource.delete(params.data)
                .then((response: ResponseInterface) =>
                {
                    Delete.onSuccess(response, store);
                    resolve(response);
                })
                .catch((response: ResponseInterface) =>
                {
                    Delete.onError(response, store);
                    reject(response);
                });
        });
    }

    /**
     * Handle a successfull response.
     */
    static onSuccess(response: ResponseInterface, store: Store<any>)
    {
        store.dispatch('delete', {
            where: response.body.data.id,
            data: response.body.data
        });
    }
}

/**
 * Delete action parameters.
 */
export interface DeleteParameters
{
    data: any,
    options: any,
    model: ExtendedModel
}
