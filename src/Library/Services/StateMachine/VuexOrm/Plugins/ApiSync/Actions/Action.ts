import ApiFactory, { ApiClient } from '../../../../../../Api';
import { Store } from 'vuex';
import Pluralize from 'pluralize';
import ResponseInterface from "spa-skeleton/src/Library/API/ResponseInterface";

/**
 * An action.
 */
export abstract class Action
{
    /**
     * Api client.
     */
    protected static api: ApiClient;

    /**
     * Boot the action.
     */
    static boot()
    {
        Action.api = ApiFactory.make();

        return Action;
    }

    /**
     * Execute the action.
     *
     * Override this function.
     */
    static execute(state: Store<any>, params: any): Promise<any>
    {
        return new Promise(() => {
            throw 'Define the default action in the extending class.'
        })
    }

    /**
     * Get the resource name.
     */
    protected static getResourceName(store: Store<any>): string
    {
        return Pluralize(store.state.$name);
    }

    /**
     * Handle a successful response.
     */
    protected static onSuccess(response: ResponseInterface, store: Store<any>)
    {
        throw 'Define the `onSuccess` function in the extending class.'
    }

    /**
     * Handle an error response.
     */
    protected static onError(response: ResponseInterface, store: Store<any>)
    {
        throw 'Define the `onError` function in the extending class.'
    }
}
