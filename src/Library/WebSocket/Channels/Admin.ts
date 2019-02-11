import AbstractChannel from '../AbstractChannel';

/**
 * Admin WS channel.
 */
export default class Admin extends AbstractChannel
{
    /**
     * Get the channel name.
     */
    name(): string
    {
        return 'Admin';
    }

    /**
     * Whether it's possible for the user to enter the channel.
     */
    canEnter(): boolean
    {
        let user = this.store.getters.app.user;

        return user && user.role && user.role.name === 'administrator';
    }
}