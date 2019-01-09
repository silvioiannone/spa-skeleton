import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action } from './Action';
import { Store } from 'vuex';

/**
 * Get ($get) action.
 */
export class Get extends Action
{
    /**
     * Execute the action.
     */
    static execute(store: Store<any>, params: GetParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let resource = Get.getResource(store);
            let requestParameters = params.options.parameters;

            if (requestParameters) {
                resource.setParameters(requestParameters);
            }

            resource.get(params.id)
                .then((response: ResponseInterface) =>
                {
                    Get.onSuccess(response, store);
                    resolve(response);
                })
                .catch((response: ResponseInterface) =>
                {
                    Get.onError(response, store);
                    reject(response);
                });
        });
    }

    /**
     * Handle a successful response.
     */
    static onSuccess(response: ResponseInterface, store: Store<any>)
    {
        store.dispatch(`create`, {
            data: response.body.data
        });

        store.commit('app/insert', {
            ui: {
                pagination: response.body.meta
            }
        }, { root: true });
    }
}

/**
 * Get action parameters.
 */
export interface GetParameters
{
    id: string,
    options: any,
    model: ExtendedModel
}
