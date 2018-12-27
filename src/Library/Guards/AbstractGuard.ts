import Log       from '../Services/Logger';
import { Store } from 'vuex';

/**
 * This class should be extended by all guards.
 *
 * @abstract
 */
export default abstract class AbstractGuard
{
    /**
     * Guard name.
     */
    protected name: string = '';

    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Constructor.
     */
    protected constructor(store: Store<any>)
    {
        this.store = store;
    }

    /**
     * Execute the guard.
     *
     * @return {Promise}
     */
    execute(): Promise<any>
    {
        Log.debug('Executing guard ' + this.name + '.');

        return this.handle();
    }

    /**
     * Use this function to define what the guard should do. Each guard should return a function
     * returning a promise (this is needed in order to avoid that the promise is executed
     * immediately).
     */
    protected abstract handle(): Promise<any>
}
