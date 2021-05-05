import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from '../Action';
import { Store }             from 'vuex';
import { StateMachine }      from '../../../../../StateMachine';

/**
 * Create ($create) action.
 */
export class Create extends Action
{
    /**
     * Execute the action.
     */
    protected async execute(
        store: Store<any>,
        params: CreateParameters
    ): Promise<ResponseInterface>
    {
        let resource = this.getResource(store);
        let response;

        try {
            response = await resource.create(params.data)
        } catch (error) {
            this.onError(error, store, params);
            throw error;
        }

        this.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    protected onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: CreateParameters
    ): void
    {
        params.model.insert(response.body);

        // We need to update the pagination and increase the total items count but since the local
        // `store` variable is a reference to the VuexORM entities store, we need to access the
        // global store in the state machine.
        let rootStore = StateMachine.getStore();
        let currentTotal = rootStore.getters.app.ui.pagination.total;
        rootStore.commit('app/INSERT', {
            ui: {
                pagination: {
                    total: currentTotal ? currentTotal + 1 : 1
                }
            }
        });
    }
}

/**
 * Create action parameters.
 */
export interface CreateParameters
{
    data: any;
    options: any;
    model: typeof ExtendedModel;
}
