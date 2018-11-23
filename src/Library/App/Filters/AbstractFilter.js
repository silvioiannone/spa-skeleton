/**
 * An abstract filter.
 */
export default class AbstractFilter
{
    /**
     * Constructor.
     *
     * @param store
     */
    constructor(store)
    {
        this.store = store;
    }

    /**
     * Run the filter.
     *
     * @param value
     * @abstract
     */
    run(value) {}
}
