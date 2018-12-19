import AbstractGuard from '../../Guards/AbstractGuard';
import API           from '../../Api';
import Token         from '../../Api/Token';

/**
 * Auth guard.
 *
 * The purpose of this guard is to check that the token used to send API request is not expired.
 * If the token is expired then it proceeds to refresh it before continuing.
 */
export default class Auth extends AbstractGuard
{
    /**
     * Guard name.
     */
    protected name: string = 'Auth';

    /**
     * Run the guard.
     */
    handle(): Promise<any>
    {
        let token = new Token();
        let api = new API();

        return new Promise((resolve: Function, reject: Function) =>
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
                        token.save(response.body.access_token);
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
