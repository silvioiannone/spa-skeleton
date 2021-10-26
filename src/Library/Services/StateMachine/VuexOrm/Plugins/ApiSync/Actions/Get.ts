import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from '../Action';
import { Store }             from 'vuex';
import { Pagination }        from '../../../../../../Utils/Pagination';
import _ from 'lodash';

/**
 * Get ($get) action.
 */
export class Get extends Action
{
    /**
     * Execute the action.
     */
    protected async execute(
        store: Store<any>,
        params: ActionParameters
    ): Promise<ResponseInterface> {
        let resource = this.getResource(store);
        let requestParameters = null;
        let response;

        if (params?.options?.parameters) {
            requestParameters = params.options.parameters;
            resource.setParameters(requestParameters);
        }

        try {
            response = await resource.get(params.id);
        } catch (error: any) {
            this.onError(error, store, params);
            throw error;
        }

        this.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle an error response.
     */
    protected onError(error: ResponseInterface, store: Store<any>, params: ActionParameters)
    {
        if (error.status === 401) {
            return;
        }

        super.onError(error, store, params);
    }

    /**
     * Handle a successful response.
     */
    protected onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: ActionParameters
    ): void
    {
        let method = params.options && params.options.insert ? 'insert' : 'create';

        let payload = {
            // Vuex-orm makes changes to the data object so in order to prevent those changes to end
            // up in the response object we make a copy of the data.
            data: _.cloneDeep(response.body.data)
        };

        if (_.get(params, 'options.vuex.insert')) {
            payload['insert'] = _.get(params, 'options.vuex.insert');
        }

        if (_.get(params, 'options.vuex.create')) {
            payload['create'] = _.get(params, 'options.vuex.create');
        }

        params.model[method](payload);

        if (response.body.meta) {
            store.commit('app/INSERT', {
                ui: {
                    pagination: Pagination.makeFromResponse(response)
                }
            }, { root: true });
        }
    }
}

/**
 * Action parameters.
 */
interface ActionParameters
{
    // ID of the resource.
    id: string;

    // Model of the resource.
    model: typeof ExtendedModel;

    // Options.
    options: GetParameters;
}

/**
 * Get action parameters.
 */
export interface GetParameters
{
    // Query parameters that will be sent with the request.
    parameters?: any;

    // Instead of creating will insert new records along the existing ones.
    insert?: undefined | boolean;

    // VuexORM specific settings.
    vuex?: {
        // Same as the create option for relations:
        // https://vuex-orm.github.io/vuex-orm/guide/data/inserting-and-updating.html#insert-method-for-relationships
        create?: string[];

        // Same as the insert option for relations:
        // https://vuex-orm.github.io/vuex-orm/guide/data/inserting-and-updating.html#insert-method-for-relationships
        insert?: string[];
    };
}
