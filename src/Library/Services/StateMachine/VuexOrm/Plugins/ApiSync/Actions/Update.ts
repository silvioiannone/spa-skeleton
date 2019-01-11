import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action } from './Action';
import { Store } from 'vuex';


/**
 * Update ($update) action.
 */
export class Update extends Action
{
    static execute(store: Store<any>, params: UpdateParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let resource = Update.getResource(store);

            resource.update(params.data)
                .then((response: ResponseInterface) =>
                {
                    Update.onSuccess(response, store);
                    resolve(response);
                })
                .catch((response: ResponseInterface) =>
                {
                    Update.onError(response, store);
                    reject(response);
                });
        });
    }

    /**
     * Handle a successfull response.
     */
    static onSuccess(response: ResponseInterface, store: Store<any>)
    {
        store.dispatch('update', {
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
    data: any,
    options: any,
    model: ExtendedModel
}
