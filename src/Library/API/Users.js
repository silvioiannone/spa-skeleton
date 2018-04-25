import AbstractResource from './AbstractResource';
import Config           from '../../Config';

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
     *
     * @param userData
     * @return {Promise}
     */
    activate(userData)
    {
        return this._post('activate', userData);
    }

    /**
     * Get a list of all the users.
     *
     * @return {Promise}
     */
    get()
    {
        return this._get('');
    }

    /**
     * Change the user password after it has been reset.
     *
     * @param {Object} data An object in the following format:
     *        { password: '', password_confirmation: '', token: '' }
     * @return {Promise}
     */
    changePassword(data)
    {
        return this._post('changePassword', data);
    }

    /**
     * Get the user.
     *
     * @param userId If no id is specified the logged in user will be returned.
     * @return {Promise}
     */
    find(userId)
    {
        return this._get(userId);
    }

    /**
     * Get the user email using the password reset token.
     *
     * @param token
     * @return {Promise}
     */
    findFromPasswordResetToken(token)
    {
        return this._get('resetToken/' + token);
    }

    /**
     * Get the activation basic data.
     *
     * @param activationId
     * @return {Promise}
     */
    getActivation(activationId)
    {
        return this._get('activation/' + activationId);
    }

    /**
     * Invite the user to join the platform.
     *
     * @param user
     * @return {Promise}
     */
    invite(user)
    {
        return this._post(user.id + '/invite', user);
    }

    /**
     * Log in a user.
     *
     * @param {Object} userCredentials
     * @return {Promise}
     */
    login(userCredentials)
    {
        let parameters = userCredentials;

        parameters.grant_type = 'password';
        parameters.client_id = Config.client.id;
        parameters.client_secret = Config.client.secret;
        parameters.scope = '*';

        let request = this.httpClient
            .post('/oauth/token')
            .send(parameters);

        return this.dispatchRequest(request);
    }

    /**
     * Log out the user.
     *
     * @return {Promise}
     */
    quit()
    {
        return this._post('quit', {});
    }

    /**
     * Refresh the user's JWT.
     *
     * @return {Promise}
     */
    refreshToken()
    {
        return this._get('token');
    }

    /**
     * Reset the user's password.
     *
     * @param {string} email
     * @return {Promise}
     */
    resetPassword(email)
    {
        return this._post('resetPassword', {
            'email': email
        });
    }

    /**
     * Sign up a new user.
     *
     * @param {Object} userData
     */
    signup(userData)
    {
        return this._post('', userData);
    }

    /**
     * Update a user.
     *
     * @param userData
     * @return {Promise}
     */
    update(userData)
    {
        return this._patch('', userData);
    }

    /**
     * Update avatar.
     *
     * @param {string} userId
     * @return {Promise}
     */
    updateAvatar(userId, avatar)
    {
        return this
            .attach('avatar', avatar)
            ._post(userId + '/avatar');
    }
}
