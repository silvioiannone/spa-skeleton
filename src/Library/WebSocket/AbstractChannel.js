/**
 * A websocket channel.
 */
export default class AbstractChannel
{
    /**
     * @param store
     */
    constructor(store)
    {
        this.store = store;

        /**
         * Whether the channel is private or not.
         *
         * @type {boolean}
         */
        this.private = true;
    }

    /**
     * Whether the channel is private or not.
     *
     * @returns {boolean}
     */
    isPrivate()
    {
        return this.private;
    }
}
