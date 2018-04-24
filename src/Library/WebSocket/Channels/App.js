import AbstractChannel from '../AbstractChannel';

/**
 * App WS channel.
 */
export default class App extends AbstractChannel
{
    /**
     * @param store
     */
    constructor(store)
    {
        super(store);

        this.private = false;
    }

    /**
     * Get the channel name.
     */
    name()
    {
        return 'App';
    }
}
