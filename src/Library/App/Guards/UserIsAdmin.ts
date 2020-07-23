import { AbstractGuard } from '../../../Library/Guards/AbstractGuard';

/**
 * UserIsAdmin guard.
 *
 * This guard allows access to the user only if he/she is an admin.
 */
export class UserIsAdmin extends AbstractGuard
{
    /**
     * Guard name.
     */
    protected name: string = 'UserIsAdmin';

    /**
     * Run the guard.
     */
    public handle(): Promise<any>
    {
        return new Promise((resolve, reject): void =>
        {
            this.store.getters.app.user.role.name === 'administrator' ?
                resolve() : reject('You\'re not an administrator. Go away.');
        });
    }
}
