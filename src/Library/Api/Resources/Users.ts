import AbstractResource  from './AbstractResource';
import Config            from '../../../Config';
import ResponseInterface from '../ResponseInterface';

/**
 * Users resource.
 */
export default class Users extends AbstractResource
{
    constructor()
    {
        super();

        this.resourceName = 'users';
    }

    /**
     * Activate a user account. The user must have been invited before.
     */
    activate(userData: any): Promise<ResponseInterface>
    {
        return this._post('activate', userData);
    }

    /**
     * Get a list of all the users.
     */
    get(id: string = ''): Promise<ResponseInterface>
    {
        return this._get(id);
    }

    /**
     * Change the user password after it has been reset.
     */
    changePassword(data: {password: string, password_confirmation: string})
        : Promise<ResponseInterface>
    {
        return this._post('changePassword', data);
    }

    /**
     * Get the user.
     */
    find(userId: any): Promise<ResponseInterface>
    {
        return this._get(userId);
    }

    /**
     * Get the user email using the password reset token.
     */
    findFromPasswordResetToken(token: any): Promise<ResponseInterface>
    {
        return this._get('resetToken/' + token);
    }

    /**
     * Get the activation basic data.
     */
    getActivation(activationId: any): Promise<ResponseInterface>
    {
        return this._get('activation/' + activationId);
    }

    /**
     * Invite the user to join the platform.
     */
    invite(user: any): Promise<ResponseInterface>
    {
        return this._post(user.id + '/invite', user);
    }

    /**
     * Log in a user.
     */
    async login(userCredentials: {username: string, password: string}): Promise<ResponseInterface>
    {
        return this._post('./api/v1/oauth/token', {
            ...userCredentials,
            grant_type: 'password',
            client_id: Config.client.id,
            client_secret: Config.client.secret,
            scope: '*'
        });
    }

    /**
     * Log out the user.
     */
    quit(): Promise<ResponseInterface>
    {
        return this._post('quit', {});
    }

    /**
     * Refresh the user's JWT.
     */
    refreshToken(): Promise<ResponseInterface>
    {
        return this._get('token');
    }

    /**
     * Reset the user password.
     */
    resetPassword(data: any): Promise<ResponseInterface>
    {
        return this._post('resetPassword', data);
    }

    /**
     * Reset the user's password.
     */
    sendPasswordResetEmail(email: any): Promise<ResponseInterface>
    {
        return this._post('sendPasswordResetEmail', {
            'email': email
        });
    }

    /**
     * Sign up a new user.
     */
    create(data: any): Promise<ResponseInterface>
    {
        return this._post('', data);
    }

    /**
     * Update a user.
     */
    update(data: any): Promise<ResponseInterface>
    {
        return this._patch('', data);
    }

    /**
     * Update avatar.
     */
    updateAvatar(id: string, avatar: File): Promise<ResponseInterface>
    {
        return this
            .attach('avatar', avatar)
            ._post(id + '/avatar');
    }
}
