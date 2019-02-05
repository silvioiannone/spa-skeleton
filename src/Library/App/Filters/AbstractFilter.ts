import { Store } from 'vuex';

/**
 * An abstract filter.
 */
export default abstract class AbstractFilter
{
    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Constructor.
     *
     * @param store
     */
    constructor(store: Store<any>)
    {
        this.store = store;
    }

    /**
     * Run the filter.
     */
    abstract run(value: string, ...args: Array<any>): string
}
