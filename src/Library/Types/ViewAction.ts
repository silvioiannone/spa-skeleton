import { ResponseInterface } from 'spa-skeleton';
import { Store }             from 'vuex';

/**
 * Describe how a view action (used by the View state machine module) should be defined.
 */
export type ViewAction = (store: Store<any>, payload: any) => Promise<ResponseInterface>
