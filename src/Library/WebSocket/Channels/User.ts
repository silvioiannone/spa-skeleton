import AbstractChannel from '../AbstractChannel';

/**
 * User WS channel.
 */
export default class User extends AbstractChannel
{
    /**
     * Get the channel name.
     */
    public name(): string
    {
        return 'User.' + this.store.getters.app.user.id;
    }

    /**
     * Whether it's possible for the user to enter the channel.
     */
    public canEnter(): boolean
    {
        let user = this.store.getters.app.user;

        return user && user.id;
    }
}
