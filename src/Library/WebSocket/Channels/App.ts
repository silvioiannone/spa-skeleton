import AbstractChannel from '../AbstractChannel';

/**
 * App WS channel.
 */
export default class App extends AbstractChannel
{
    /**
     * Whether the channel is private or not.
     */
    protected private: boolean = false;

    /**
     * Get the channel name.
     */
    public name(): string
    {
        return 'App';
    }
}
