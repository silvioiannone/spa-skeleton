import AbstractGuard from '../../Guards/AbstractGuard';
import API           from '../../API';
import Token         from '../../API/Token';

/**
 * Auth guard.
 *
 * The purpose of this guard is to check that the token used to send API request is not expired.
 * If the token is expired then it proceeds to refresh it before continuing.
 */
export default class Auth extends AbstractGuard
{
    constructor()
    {
        super();

        this.guardName = 'Auth';
    }

    /**
     * Run the guard.
     *
     * @return {Promise}
     */
    handle()
    {
        let token = new Token();
        let api = new API();

        return new Promise((resolve, reject) =>
        {
            // Avoid requesting a token if there's already a request pending
            if(sessionStorage.getItem('fetchingToken'))
            {
                resolve();
                return;
            }

            if(token.isExpired())
            {
                api.users.refreshToken()
                    .then(response =>
                    {
                        token.save(response);
                        sessionStorage.removeItem('fetchingToken');
                        resolve();
                    })
                    .catch(response =>
                    {
                        token.remove();
                        sessionStorage.removeItem('fetchingToken');
                        reject(response);
                    });

                return;
            }

            resolve();
        });
    }
}
