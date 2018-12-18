import AbstractChannel from '../AbstractChannel';

/**
 * User WS channel.
 */
export default class User extends AbstractChannel
{
    /**
     * Get the channel name.
     *
     * @return {String}
     */
    name()
    {
        return 'User.' + this.store.getters.app.user.id;
    }

    /**
     * Whether it's possible for the user to enter the channel.
     *
     * @abstract
     * @return {Boolean}
     */
    canEnter()
    {
        let user = this.store.getters.app.user;

        return user && user.id;
    }
}
