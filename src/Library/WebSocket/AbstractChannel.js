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

    /**
     * Get the channel name.
     *
     * @abstract
     * @return {String}
     */
    name() {
        return '';
    }

    /**
     * Whether it's possible for the user to enter the channel.
     *
     * @return {Boolean}
     */
    canEnter()
    {
        return true;
    }
}
