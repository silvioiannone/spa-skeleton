import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action }        from './Action';
import { Store }         from 'vuex';


/**
 * Create ($create) action.
 */
export class Create extends Action
{
    public static execute(store: Store<any>, params: CreateParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function): void =>
        {
            let resource = Create.getResource(store);

            resource.create(params.data)
                .then((response: ResponseInterface): void =>
                {
                    Create.onSuccess(response, store, params);
                    resolve(response);
                })
                .catch((response: ResponseInterface): void =>
                {
                    Create.onError(response, store, params);
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
