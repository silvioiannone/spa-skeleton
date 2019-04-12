import ApiFactory, { ApiClient } from '../../../../../../Api';
import { Store }                 from 'vuex';
import Pluralize                 from 'pluralize';
import ApiResource               from '../../../../../../Api/Resources/ApiResource';

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
    public static boot(): Action
    {
        Action.api = ApiFactory.make();

        return Action;
    }

    /**
     * Execute the action.
     *
     * Override this function.
     */
    public static execute(): Promise<any>
    {
        return new Promise((): void => {
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
    protected static onSuccess(): void
    {
        throw 'Define the `onSuccess` function in the extending class.'
    }

    /**
     * Handle an error response.
     */
    protected static onError(): void
    {
        //throw 'Define the `onError` function in the extending class.'
    }
}
