import Log from 'loglevel';

/**
 * This class should be extended by all guards.
 *
 * @abstract
 */
export default class AbstractGuard
{
    /**
     * @param {Store} store
     */
    constructor(store)
    {
        this.guardName = '';
        this.store = store;
    }

    /**
     * Execute the guard.
     *
     * @return {Promise}
     */
    execute()
    {
        Log.debug('Executing guard ' + this.guardName + '.');

        return this.handle();
    }

    /**
     * Use this function to define what the guard should do. Each guard should return a function
     * returning a promise (this is needed in order to avoid that the promise is executed
     * immediately).
     *
     * @abstract
     * @protected
     * @return {Promise}
     */
    handle() {};
}
