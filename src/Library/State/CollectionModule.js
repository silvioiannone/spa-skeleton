import AbstractModule from './AbstractModule';
import _ from 'lodash';

/**
 * This class handles collection modules, such as Agents, Websites, Campaigns etc...
 */
export default class CollectionModule extends AbstractModule
{
    constructor()
    {
        super();

        /**
         * Module relations.
         * 
         * E.g.: 'agendas.point', 'meetings.agenda.point'...
         */
        this.relations = [];

        /**
         * Key that indicates the field that stores an item's position.
         *
         * @type {string}
         */
        this.positionKey = 'position';
    }

    /**
     * Collection actions.
     */
    actions()
    {
        let actions = {};

        let deleteActionName = this.getModuleName() + '/DELETE';
        let deleteActionLocalName = this.getModuleName() + '/DELETE-LOCAL';
        let updateActionLocalName = this.getModuleName() + '/UPDATE-LOCAL';

        actions[deleteActionName] = this.deleteAction();
        actions[deleteActionLocalName] = this.deleteLocalAction();
        actions[updateActionLocalName] = this.updateLocalAction();

        return actions;
    }

    /**
     * Delete action.
     *
     * This action deletes the given resource from the server an locally.
     *
     * @protected
     */
    deleteAction()
    {
        return (store, resource) => new Promise((resolve, reject) =>
        {
            return this.api[this.getModuleName()]
                .delete(resource)
                .then(response =>
                {
                    this.deleteTwinsInRelatedResources(store, resource);
                    store.commit(this.getDeleteMutationName(), resource);
                    resolve(response);
                })
                .catch(response => reject(response));
        })
    }

    /**
     * Delete local action.
     *
     * This action deletes the given resource locally. The server resource will not be touched.
     *
     * @protected
     */
    deleteLocalAction()
    {
        return (store, resource) => new Promise((resolve, reject) =>
        {
            this.deleteTwinsInRelatedResources(store, resource);
            store.commit(this.getDeleteMutationName(), resource);
            resolve(resource);
        });
    }

    /**
     * Update local action.
     *
     * @protected
     */
    updateLocalAction()
    {
        return (store, resource) => new Promise((resolve, reject) =>
        {
            this.updatePositions(store, resource);
            store.commit(this.getAddMutationName(), {data: resource});
            resolve(resource);
        });
    }

    /**
     * Update the position of the resources if the current resource has been moved.
     */
    updatePositions(store, resource)
    {
        let resources = [
            ...store.getters[this.getModuleName()],
            ...this.getRelatedResources(store, resource)
        ];
        let oldResource = resources.find(currentResource => currentResource.id === resource.id);

        if (! oldResource || oldResource[this.positionKey] === resource[this.positionKey]) {
            return;
        }

        // If the resource was moved down...
        if (resource[this.positionKey] >= oldResource[this.positionKey]) {
            // ...move up all the resources between the new and old resource position.
            resources.filter(currentResource =>
            {
                return currentResource[this.positionKey] > oldResource[this.positionKey] &&
                    currentResource[this.positionKey] <= resource[this.positionKey]
            })
                .forEach(currentResource => currentResource[this.positionKey]--);
        } else {
            resources.filter(currentResource =>
            {
                return currentResource[this.positionKey] >= resource[this.positionKey] &&
                    currentResource[this.positionKey] < oldResource[this.positionKey]
            })
                .forEach(currentResource => currentResource[this.positionKey]++);
        }
    }

    /**
     * Delete the twins of a resource in related modules.
     *
     * @param store
     * @param resource
     * @protected
     */
    deleteTwinsInRelatedResources(store, resource)
    {
        this.forEachRelatedResource(store, resource, (relatedResource, path) =>
        {
            this.deleteItem(_.get(relatedResource, path), resource);
        });
    }

    /**
     * Perform an action on each related resource.
     *
     * @param store
     * @param resource
     * @param callback
     */
    forEachRelatedResource(store, resource, callback)
    {
        let relatedResources = this.getRelatedResources(store, resource);

        this.relations.forEach(relation =>
        {
            let [module, path] = this.parseRelation(relation);

            relatedResources[module].forEach(relatedResource =>
            {
                callback(relatedResource, path);
            });
        })
    }

    /**
     * Retrieve the related resources.
     *
     * @protected
     * @param store
     * @param item
     * @return Object
     */
    getRelatedResources(store, item)
    {
        // We need to loop through all the related resources and find the ones that have a relation
        // to the item.
        let resources = {};

        this.relations.forEach(relation =>
        {
            // Take the related and split it into its parts: 'meetings.agenda.points' will become
            // ['meetings', 'agenda.points'].
            let [module, path] = this.parseRelation(relation);

            resources[module] = [];

            store.getters[module].forEach(relatedResource =>
            {
                let twins = _.get(relatedResource, path, false);

                if (! twins || ! twins.length) {
                    return;
                }

                if (twins.find(twin => twin.id === item.id)) {
                    resources[module].push(relatedResource);
                }
            });
        });

        return resources;
    }

    /**
     * Parse the related resource string.
     *
     * E.g.: 'meeting', 'agenda.points' etc...
     *
     * @param relation
     * @returns {{groups: {}}|RegExpExecArray}
     */
    parseRelation(relation)
    {
        let [, module, path] = /([\w]+)\.?(.+)?/.exec(relation);

        path = path || this.getModuleName();

        return [module, path]
    }

    /**
     * Collection getters.
     */
    getters()
    {
        let getters = {};

        // Getter: <module> (E.g.: estates, viewings, deals)
        getters[this.getModuleName()] = state => state.data;

        // Getter: <module>Meta
        getters[this.getModuleName() + 'Meta'] = state => state.meta;

        return getters;
    }

    /**
     * Collection mutations.
     *
     * This includes mutations to store, add and delete a specific element.
     */
    mutations()
    {
        let mutations = {};

        // <module>/STORE mutation
        mutations[this.getStoreMutationName()] = this.storeMutation;

        // <module>/ADD mutation definition
        mutations[this.getAddMutationName()] = this.addMutation;

        // <module>/DELETE mutation definition
        mutations[this.getDeleteMutationName()] = this.deleteMutation();

        return mutations;
    }

    /**
     * State definition.
     */
    state()
    {
        return {

            // The items.
            data: [],
            // Meta regarding the items.
            meta: {}
        };
    }

    /**
     * The <module>/STORE mutation.
     *
     * @protected
     * @param state
     * @param body
     */
    storeMutation(state, body)
    {
        // Do not add data to the state if the body's data evaluates to false.
        if (body.data && (body.data || body.data.length)) {
            state.data = Array.isArray(body.data) ? body.data : [body.data];
        }
        state.meta = body.meta || {};
    }

    /**
     * The <module>/ADD mutation.
     *
     * @protected
     * @param state
     * @param body
     */
    addMutation(state, body)
    {
        let items = body.data;

        items = Array.isArray(items) ? items : [items];

        // This collection buffer will be used in order to improve performances.
        // The changes to the state will be applied (triggering Vue to re-render) only when all the
        // elements have been added to the state.
        let buffer = state.data.slice(0);

        items.forEach(currentItem =>
        {
            if(! currentItem.id) return;

            // Find the index where the current item (element) is located.
            let index = buffer.findIndex(item => item.id === currentItem.id);

            // If the item is not found...
            if(index < 0 || !state) {
                buffer.push(currentItem);
            } else {
                buffer[index] = Object.assign(buffer[index], currentItem);
            }
        });

        state.data = buffer.slice(0);

        if (body.meta) {
            state.meta = body.meta;
        }
    }

    /**
     * The <module>/DELETE mutation.
     *
     * @protected
     * @param state
     * @param body
     */
    deleteMutation()
    {
        return (state, body) =>
        {
            this.deleteItem(state.data, body);
        }
    }

    /**
     * Delete the item with the matching id.
     *
     * @protected
     * @param items
     * @param item
     */
    deleteItem(items, item)
    {
        let index = items.findIndex(_item => _item.id === item.id);

        if (index === -1) return;

        items.splice(index, 1);
    }

    /**
     * Get the module name.
     *
     * @protected
     */
    getModuleName()
    {
        return this.moduleName;
    }

    /**
     * Get the delete mutation name.
     *
     * @protected
     * @return String
     */
    getDeleteMutationName()
    {
        return this.getModuleName() + '/DELETE';
    }

    /**
     * Get the add mutation name.
     *
     * @protected
     * @return String
     */
    getAddMutationName()
    {
        return this.getModuleName() + '/ADD';
    }

    /**
     * Get the store mutation name.
     *
     * @protected
     * @return String
     */
    getStoreMutationName()
    {
        return this.getModuleName() + '/STORE';
    }
}
