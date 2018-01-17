import AbstractChannel from '../AbstractChannel';

/**
 * User WS channel.
 */
export default class User extends AbstractChannel
{
    /**
     * Get the channel name.
     */
    name()
    {
        return 'User.' + this.store.getters.app.user.id;
    }
}
