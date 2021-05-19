import { AbstractGuard } from '../../Guards/AbstractGuard';
import { ApiFactory }    from '../../Api';
import { Token }         from '../../Api/Token';

/**
 * Auth guard.
 *
 * The purpose of this guard is to check that the token used to send API request is not expired.
 * If the token is expired then it proceeds to refresh it before continuing.
 */
export class Auth extends AbstractGuard
{
    /**
     * Guard name.
     */
    protected name: string = 'Auth';

    /**
     * Run the guard.
     */
    public handle(): Promise<any>
    {
        let api = ApiFactory.make();

        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            if (! this.store.getters.app?.user?.id) {
                reject('The user is not logged in.');
                return;
            }

            // Avoid requesting a token if there's already a request pending
            if(sessionStorage.getItem('fetchingToken')) {
                resolve();
                return;
            }

            if(Token.isExpired()) {
                let response;

                try {
                    response = await api.users.refreshToken()
                } catch (error) {
                    Token.remove();
                    sessionStorage.removeItem('fetchingToken');
                    reject(response);
                    return;
                }

                Token.save(response.body.access_token);
                sessionStorage.removeItem('fetchingToken');
            }

            resolve();
        });
    }
}
