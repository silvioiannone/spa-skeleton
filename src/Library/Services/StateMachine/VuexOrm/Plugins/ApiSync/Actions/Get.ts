import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from './Action';
import { Store }             from 'vuex';

/**
 * Get ($get) action.
 */
export class Get extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: ActionParameters
    ): Promise<ResponseInterface>
    {
        let resource = Get.getResource(store);
        let requestParameters = null;
        let response = null;

        if (params.options && params.options.parameters) {
            requestParameters = params.options.parameters;
        }

        if (requestParameters) {
            resource.setParameters(requestParameters);
        }

        try {
            response = await resource.get(params.id);
        } catch (error) {
            Get.onError(error, store, params);
            throw error;
        }

        Get.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: ActionParameters
    ): void
    {
        if (params.options && params.options.insert) {
            params.model.insert(response.body);
        } else {
            params.model.create(response.body);
        }

        store.commit('app/INSERT', {
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
    id: string;
    model: typeof ExtendedModel;
    options: GetParameters;
}

/**
 * Get action parameters.
 */
export interface GetParameters
{
    parameters: any;
    insert?: undefined | boolean;
}
