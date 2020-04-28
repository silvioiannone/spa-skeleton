import { Handler }           from './Handler';
import { ResponseInterface } from '../../Api/ResponseInterface';

/**
 * Handle guard errors.
 */
export class Guard extends Handler
{
    /**
     * The error.
     */
    protected error: ResponseInterface;

    /**
     * Errors mapped to the app status.
     */
    protected errorStatusMap: {[key: number]: string} = {
        401: 'unauthorized',
        403: 'unauthorized',
        404: 'notFound',
        429: 'tooManyAttempts',
        503: 'serviceUnavailable'
    };

    /**
     * Constructor.
     */
    public constructor(error: ResponseInterface)
    {
        super(error);
    }

    /**
     * Handle the error.
     */
    public handle(): void
    {
        this.store.commit('app/SET_ERROR', this.error);

        let errorStatus = this.errorStatusMap[this.error.status];
        if (errorStatus) {
            this.store.commit('app/SET_STATUS', errorStatus);
            return;
        }

        this.store.commit('app/SET_STATUS', 'error');
    }
}
