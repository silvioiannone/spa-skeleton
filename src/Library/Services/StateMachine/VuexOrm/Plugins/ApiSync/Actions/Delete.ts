import { StateMachine }      from '../../../../../StateMachine';
import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from '../Action';
import { Store }             from 'vuex';


/**
 * Delete ($delete) action.
 */
export class Delete extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: DeleteParameters
    ): Promise<ResponseInterface>
    {
        let resource = Delete.getResource(store);
        let response = null;

        try {
            response = await resource.delete(params.data)
        } catch (error) {
            Delete.onError(error, store, params);
            throw error;
        }

        Delete.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: DeleteParameters
    ): void
    {
        params.model.delete(response.body.data.id);

        // We need to update the pagination and decrease the total items count but since the local
        // `store` variable is a reference to the VuexORM entities store, we need to access the
        // global store in the state machine.
        let rootStore = StateMachine.getStore();
        let currentTotal = rootStore.getters.app.ui.pagination.total;
        rootStore.commit('app/INSERT', {
            ui: {
                pagination: {
                    total: currentTotal - 1
                }
            }
        });
    }
}

/**
 * Delete action parameters.
 */
export interface DeleteParameters
{
    data: any;
    options: any;
    model: typeof ExtendedModel;
}
