import _ from 'lodash';
import { ExtendedModel }     from '../../../Support/ExtendedModel';
import { ResponseInterface } from '../../../../../../Api/ResponseInterface';
import { Action }            from './Action';
import { Store }             from 'vuex';


/**
 * Update ($update) action.
 */
export class Update extends Action
{
    /**
     * Execute the action.
     */
    public static async execute(
        store: Store<any>,
        params: UpdateParameters
    ): Promise<ResponseInterface>
    {
        let resource = Update.getResource(store);
        let response = null;

        try {
            response = await resource.update(params.data);
        } catch (error) {
            Update.onError(error, store, params);
            throw error;
        }

        Update.onSuccess(response, store, params);

        return response;
    }

    /**
     * Handle a successful response.
     */
    public static onSuccess(
        response: ResponseInterface,
        store: Store<any>,
        params: UpdateParameters): void
    {
        let payload = {
            where: response.body.data.id,
            data: response.body.data
        };

        if (_.get(params, 'options.vuex.insert')) {
            payload['insert'] = _.get(params, 'options.vuex.insert');
        }

        if (_.get(params, 'options.vuex.create')) {
            payload['create'] = _.get(params, 'options.vuex.create');
        }

        params.model.insertOrUpdate(payload);
    }
}

/**
 * Update action parameters.
 */
interface UpdateParameters
{
    // Datat that will be sent with the request.
    data: any;

    options?: UpdateParameterOptions;

    model: typeof ExtendedModel;
}

export interface UpdateParameterOptions
{
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
