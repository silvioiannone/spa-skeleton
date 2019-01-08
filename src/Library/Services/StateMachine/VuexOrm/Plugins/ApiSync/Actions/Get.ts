import { ExtendedModel } from '../../../Support/ExtendedModel';
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
    static execute(state: Store<any>, params: GetParameters): Promise<any>
    {
        return new Promise((resolve: Function, reject: Function) =>
        {
            let model = params.model;
            console.log(params);
            console.log('EXECUTING ACTION');
        });
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
