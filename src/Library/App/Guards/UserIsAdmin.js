import AbstractGuard from 'spa-skeleton/src/Library/Guards/AbstractGuard';

/**
 * UserIsAdmin guard.
 *
 * This guard allows access to the user only if he/she is an admin.
 */
export default class UserIsAdmin extends AbstractGuard
{
    constructor(store)
    {
        super(store);

        this.guardName = 'UserIsAdmin';
    }

    /**
     * Run the guard.
     *
     * @return {*}
     */
    handle()
    {
        return new Promise((resolve, reject) =>
        {
            this.store.getters.app.user.role.name === 'administrator' ?
                resolve() : reject('You\'re not an administrator. Go away.');
        });
    }
}
