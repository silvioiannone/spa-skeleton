import { ApiFactory, ApiClient } from 'spa-skeleton/src/Library/Api';
import { Store, ActionObject, ActionContext } from 'vuex';
import Pluralize                 from 'pluralize';
import { ApiResource }           from 'spa-skeleton/src/Library/Api/Resources/ApiResource';
import { ResponseInterface }     from 'spa-skeleton/src/Library/Api/ResponseInterface';

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
     * Make the action.
     */
    public static make(): ActionObject<any, any>
    {
        Action.boot();

        return {
            root: false,
            handler: (store: any, injectee: any, payload?: any): any =>
                Action.execute(store, payload)
        }
    }

    /**
     * Execute the action.
     *
     * Override this function.
     */
    public static execute(store: Store<any>, params: any): Promise<any>
    {
        throw "Implement execute function.";
    }

    /**
     * Boot the action.
     */
    protected static boot(): Action
    {
        Action.api = ApiFactory.make();

        return Action;
    }

    /**
     * Get the resource name.
     */
    protected static getResourceName(store: Store<any>): string
    {
        return Pluralize(store.state.$name);
    }

    /**
     * Get the related resource.
     */
    protected static getResource(store: Store<any>): ApiResource
    {
        let name = Action.getResourceName(store);

        Action.checkResourceName(name);

        return Action.api[name];
    }

    /**
     * Check the existence of the given resource in the API client.
     */
    protected static checkResourceName(name: string): void
    {
        if (! Action.api[name]) {
            throw `Resource "${name}" was not found in the API client.`;
        }
    }

    /**
     * Handle a successful response.
     */
    protected static onSuccess(response: ResponseInterface, store: Store<any>, params: any): void
    {
        throw 'Define the `onSuccess` function in the extending class.'
    }

    /**
     * Handle an error response.
     */
    protected static onError(response: ResponseInterface, store: Store<any>, params: any): void
    {
        //throw 'Define the `onError` function in the extending class.'
    }
}
