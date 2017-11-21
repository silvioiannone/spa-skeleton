/**
 * A websocket channel.
 */
export default class AbstractChannel
{
    /**
     * Vuex store.
     *
     * @param store
     */
    constructor (store)
    {
        this.store = store;
    }
}
