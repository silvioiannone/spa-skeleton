import { ExtendedModel } from '../../../Support/ExtendedModel';
import ResponseInterface from '../../../../../../Api/ResponseInterface';
import { Action } from './Action';
import { Store } from 'vuex';


/**
 * Create ($create) action.
 */
export class Create extends Action
{
    static execute(store: Store<any>, params: CreateParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let resource = Create.getResource(store);

            resource.create(params.data)
                .then((response: ResponseInterface) =>
                {
                    Create.onSuccess(response, store);
                    resolve(response);
                })
                .catch((response: ResponseInterface) =>
                {
                    Create.onError(response, store);
                    reject(response);
                });
        });
    }

    /**
     * Handle a successfull response.
     */
    static onSuccess(response: ResponseInterface, store: Store<any>)
    {
        store.dispatch('insert', {
            data: response.body.data
        });
    }
}

/**
 * Create action parameters.
 */
export interface CreateParameters
{
    data: any,
    options: any,
    model: ExtendedModel
}
