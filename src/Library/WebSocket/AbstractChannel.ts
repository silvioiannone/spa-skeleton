import { Store } from 'vuex';

/**
 * A websocket channel.
 */
export default abstract class AbstractChannel
{
    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Whether the channel is private or not.
     */
    protected private: boolean = true;

    /**
     * Constructor.
     */
    constructor(store: Store<any>)
    {
        this.store = store;
    }

    /**
     * Whether the channel is private or not.
     */
    isPrivate(): boolean
    {
        return this.private;
    }

    /**
     * Whether it's possible for the user to enter the channel.
     */
    canEnter(): boolean
    {
        return true;
    }

    /**
     * Get the channel name.
     */
    abstract name(): string
}
