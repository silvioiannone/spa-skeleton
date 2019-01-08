import ApiFactory, { ApiClient } from '../../../../../../Api';
import { Store } from 'vuex';

/**
 * An action.
 */
export abstract class Action
{
    /**
     * Api client.
     */
    protected api: ApiClient;

    /**
     * Constructor.
     */
    constructor()
    {
        this.api = ApiFactory.make();
    }

    /**
     * Execute the action.
     */
    static execute(state: Store<any>, params: any): Promise<any> {
        return new Promise(() => {})
    }
}
