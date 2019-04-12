import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action } from './Action';
import { Store } from 'vuex';


/**
 * Update ($update) action.
 */
export class Update extends Action
{
    /**
     * Execute the action.
     */
    public static execute(store: Store<any>, params: UpdateParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function): void =>
        {
            let resource = Update.getResource(store);

            resource.update(params.data)
                .then((response: ResponseInterface): void =>
                {
                    Update.onSuccess(response, store, params);
                    resolve(response);
                })
                .catch((response: ResponseInterface): void =>
                {
                    Update.onError(response, store, params);
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
