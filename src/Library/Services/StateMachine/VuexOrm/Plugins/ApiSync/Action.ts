import { ApiFactory, ApiClient } from '../../../../../Api';
import { Store, ActionObject }   from 'vuex';
import Pluralize                 from 'pluralize';
import { ApiResource }           from '../../../../../Api/Resources/ApiResource';
import { ResponseInterface }     from '../../../../../Api/ResponseInterface';

/**
 * An action.
 */
export abstract class Action
{
    /**
     * Api client.
     */
    protected api!: ApiClient;

    /**
     * Make the action.
     */
    public static make<T extends Action>(this: new () => T): ActionObject<any, any>
    {
        let instance = new this();
        instance.api = ApiFactory.make();

        return {
            root: false,
            handler: (store: any, payload?: any): any => instance.execute(store, payload)
        }
    }

    /**
     * Execute the action.
     *
     * Override this function.
     */
    protected abstract execute(store: Store<any>, params: any): Promise<any>;

    /**
     * Get the resource name.
     */
    protected getResourceName(store: Store<any>): string
    {
        return Pluralize(store.state.$name);
    }

    /**
     * Get the related resource.
     */
    protected getResource(store: Store<any>): ApiResource
    {
        let name = this.getResourceName(store);

        this.checkResourceName(name);

        return this.api[name];
    }

    /**
     * Check the existence of the given resource in the API client.
     */
    protected checkResourceName(name: string): void
    {
        if (! this.api[name]) {
            throw `Resource "${name}" was not found in the API client.`;
        }
    }

    /**
     * Handle a successful response.
     */
    protected onSuccess(response: ResponseInterface, store: Store<any>, params: any): void
    {
        throw 'Define the `onSuccess` function in the extending class.'
    }

    /**
     * Handle an error response.
     */
    protected onError(response: ResponseInterface, store: Store<any>, params: any): void
    {
        throw response;
    }
}
