import AbstractModule from './AbstractModule';

/**
 * This class handles collection modules, such as Agents, Websites, Campaigns
 * etc...
 */
export default class CollectionModule extends AbstractModule
{
    constructor()
    {
        super();

        /*
         * Related resources.
         */
        this.related = [];
    }

    /**
     * Collection actions.
     */
    actions()
    {
        let actions = {};

        let deleteActionName = this.getModuleName() + '/DELETE';

        actions[deleteActionName] = this.deleteAction();

        return actions;
    }

    /**
     * Delete action.
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
                    resolve(response);
                })
                .catch(response => reject(response));
        })
    }

    /**
     * Delete the twins of a resource in related resources.
     *
     * @protected
     */
    deleteTwinsInRelatedResources(store, resource)
    {
        let relatedResources = this.getRelatedResources(store, resource);

        for (let related in relatedResources) {

            // We now need to remove the item (resource) from the related resource.
            relatedResources[related].forEach(relatedResource =>
            {
                this.deleteItem(relatedResource[this.getModuleName()], resource);
            });
        }

        store.commit(this.getDeleteMutationName(), resource);
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

        this.related.forEach(related =>
        {
            resources[related] = [];

            store.getters[related].forEach(relatedResource =>
            {
                let twins = relatedResource[this.getModuleName()];

                if (!twins || !twins.length) {
                    return;
                }

                if (twins.find(twin => twin.id === item.id)) {
                    resources[related].push(relatedResource);
                }
            });
        });

        return resources;
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
