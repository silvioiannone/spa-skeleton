import AbstractModule from './AbstractModule';

/**
 * This class handles collection modules, such as Agents, Websites, Campaigns
 * etc...
 */
export default class CollectionModule extends AbstractModule
{
    /**
     * Collection actions.
     */
    actions()
    {
        return {};
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

        let storeMutationName  = this.getModuleName() + '/STORE',
            addMutationName    = this.getModuleName() + '/ADD',
            deleteMutationName = this.getModuleName() + '/DELETE';

        // <module>/STORE mutation
        mutations[storeMutationName] = this.storeMutation;

        // <module>/ADD mutation definition
        mutations[addMutationName] = this.addMutation;

        // <module>/DELETE mutation definition
        mutations[deleteMutationName] = this.deleteMutation;

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
     * @param item
     */
    deleteMutation(state, item)
    {
        let index = state.data.findIndex(_item => _item.id === item.id);

        if (index === -1) return;

        state.data.splice(index, 1);
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
}
