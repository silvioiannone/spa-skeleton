import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from './Action';
import { Store }             from 'vuex';


/**
 * Create ($create) action.
 */
export class Create extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: CreateParameters
    ): Promise<ResponseInterface>
    {
        let resource = Create.getResource(store);
        let response = null;

        try {
            response = await resource.create(params.data)
        } catch (error) {
            Create.onError(error, store, params);
            throw error;
        }

        Create.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: CreateParameters
    ): void
    {
        params.model.insert(response.body);
    }
}

/**
 * Create action parameters.
 */
export interface CreateParameters
{
    data: any;
    options: any;
    model: typeof ExtendedModel;
}
