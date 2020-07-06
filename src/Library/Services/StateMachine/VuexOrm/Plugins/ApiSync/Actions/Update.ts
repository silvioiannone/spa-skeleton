import _                                from 'lodash';
import { ExtendedModel }                from '../../../Support/ExtendedModel';
import { ResponseInterface }            from '../../../../../../Api/ResponseInterface';
import { Action }                       from '../Action';
import { Store }                        from 'vuex';
import { Model, MorphToMany, Relation } from '@vuex-orm/core';

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

        params.model.insert(payload);

        Update.deleteEmptyRelations(payload, params);
    }

    /**
     * Delete the model relations which data in the payload is an empty array.
     */
    protected static async deleteEmptyRelations(
        payload: VuexOrmPayload,
        params: UpdateParameters
    ): Promise<void> {
        // We need to delete the related models if the related payload entry is an empty array.
        for (let field in payload.data) {
            let value = payload.data[field];

            if (! Array.isArray(value) || value.length) {
                continue;
            }

            let fields = params.model.fields();

            if (! (fields[field] instanceof Relation)) {
                continue;
            }

            let model = params.model.query()
                .with(field)
                .first();

            if (! model) {
                continue;
            }

            // If it's a morph to many relationship we need to also delete the related pivot models
            // before we delete the related models.
            if (fields[field] instanceof MorphToMany) {

                let relation = (model.$fields()[field] as MorphToMany);

                // Fetch the name of the field that's located on the pivot model and refers back to
                // the model that we're going to update. For example if the model is a `Contact` and
                // the morph to many relationship refers to a `Tag` using a `Taggable` pivot then
                // the field name will be `taggable_id`. We simply fetch it from the relationship.
                let pivotModelField = relation.id;

                // Now we delete all the pivots which refer to model that we're currently updating.
                // For example, continuing with the tags example from before: we get all the
                // `Taggable` models which are linked to the model we're updating and we delete
                // them.
                await relation.pivot.delete((pivot: any): boolean => {
                    return !! (model && pivot[pivotModelField] === model.$id);
                });
            }

            return model[field].forEach((related: Model): void => { related.$delete(); });
        }
    }
}

/**
 * VuexOrm `insert`, `create` and `insertOrUpdate` functions parameter.
 */
interface VuexOrmPayload
{
    where: number;
    data: any;
    insert?: string[];
    create?: string[];
    insertOrUpdate?: string[];
}

/**
 * Update action parameters.
 */
interface UpdateParameters
{
    // Data that will be sent with the request.
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

        // Same as the insertOrUpdate option for relations:
        // https://vuex-orm.github.io/vuex-orm/guide/data/inserting-and-updating.html#insert-method-for-relationships
        insertOrUpdate?: string[];
    };
}
