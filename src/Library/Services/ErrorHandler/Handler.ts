import { Store }    from 'vuex';
import StateMachine from '../StateMachine';

/**
 * Error handler.
 */
export default abstract class Handler
{
    /**
     * The error.
     */
    protected error: any;

    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Constructor.
     */
    protected constructor(error: any)
    {
        this.error = error;
        this.store = StateMachine.getStore();
    }

    /**
     * Handle the error.
     */
    abstract handle(): void
}
