import ApiResource       from './ApiResource';
import Config            from '../../../Config';
import ResponseInterface from '../ResponseInterface';
import Token             from '../Token';

/**
 * Users resource.
 */
export default class Users extends ApiResource
{
    public resourceName: string = 'users';

    /**
     * Activate a user account. The user must have been invited before.
     */
    public activate(userData: any): Promise<ResponseInterface>
    {
        return this._post('activate', userData);
    }

    /**
     * Get a list of all the users.
     */
    public get(id: string = ''): Promise<ResponseInterface>
    {
        return this._get(id);
    }

    /**
     * Change the user password after it has been reset.
     */
    public changePassword(
        data: {password: string; password_confirmation: string}
    ): Promise<ResponseInterface>
    {
        return this._post('changePassword', data);
    }

    /**
     * Get the user.
     */
    public find(userId: any): Promise<ResponseInterface>
    {
        return this._get(userId);
    }

    /**
     * Get the user email using the password reset token.
     */
    public findFromPasswordResetToken(token: any): Promise<ResponseInterface>
    {
        return this._get('resetToken/' + token);
    }

    /**
     * Get the activation basic data.
     */
    public getActivation(activationId: any): Promise<ResponseInterface>
    {
        return this._get('activation/' + activationId);
    }

    /**
     * Invite the user to join the platform.
     */
    public invite(user: any): Promise<ResponseInterface>
    {
        return this._post(user.id + '/invite', user);
    }

    /**
     * Log in a user.
     */
    public async login(
        userCredentials: {username: string; password: string}
    ): Promise<ResponseInterface>
    {
        // Delete the old token in order to avoid issues since the authentication endpoint doesn't
        // expect it.
        Token.remove();

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
    public quit(): Promise<ResponseInterface>
    {
        return this._post('quit', {});
    }

    /**
     * Refresh the user's JWT.
     */
    public refreshToken(): Promise<ResponseInterface>
    {
        return this._get('token');
    }

    /**
     * Reset the user password.
     */
    public resetPassword(data: any): Promise<ResponseInterface>
    {
        return this._post('resetPassword', data);
    }

    /**
     * Reset the user's password.
     */
    public sendPasswordResetEmail(email: any): Promise<ResponseInterface>
    {
        return this._post('sendPasswordResetEmail', {
            'email': email
        });
    }

    /**
     * Sign up a new user.
     */
    public create(data: any): Promise<ResponseInterface>
    {
        return this._post('', data);
    }

    /**
     * Update a user.
     */
    public update(data: any): Promise<ResponseInterface>
    {
        return this._patch('', data);
    }

    /**
     * Update avatar.
     */
    public updateAvatar(id: string, avatar: File): Promise<ResponseInterface>
    {
        return this
            .attach('avatar', avatar)
            ._post(id + '/avatar');
    }
}
