import AbstractChannel from '../AbstractChannel';

/**
 * Admin WS channel.
 */
export default class Admin extends AbstractChannel
{
    /**
     * Get the channel name.
     */
    name()
    {
        return 'Admin';
    }
}
