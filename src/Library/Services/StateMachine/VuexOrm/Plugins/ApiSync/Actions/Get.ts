import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action }        from './Action';
import { Store }         from 'vuex';

/**
 * Get ($get) action.
 */
export class Get extends Action
{
    /**
     * Execute the action.
     */
    static execute(store: Store<any>, params: ActionParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let resource = Get.getResource(store);
            let requestParameters = null;

            if (params.options && params.options.parameters) {
                requestParameters = params.options.parameters;
            }

            if (requestParameters) {
                resource.setParameters(requestParameters);
            }

            resource.get(params.id)
                .then((response: ResponseInterface) =>
                {
                    Get.onSuccess(response, store, params);
                    resolve(response);
                })
                .catch((response: ResponseInterface) =>
                {
                    Get.onError(response, store, params);
                    reject(response);
                });
        });
    }

    /**
     * Handle a successful response.
     */
    static onSuccess(response: ResponseInterface, store: Store<any>, params: ActionParameters)
    {
        params.model.create(response.body);

        store.commit('app/insert', {
            ui: {
                pagination: response.body.meta
            }
        }, { root: true });
    }
}

/**
 * Action parameters.
 */
interface ActionParameters
{
    id: string,
    model: typeof ExtendedModel,
    options: GetParameters
}

/**
 * Get action parameters.
 */
export interface GetParameters
{
    parameters: any
}
