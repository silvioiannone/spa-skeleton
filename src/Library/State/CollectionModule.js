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
        getters[this.getModuleName()] = state =>
        {
            return state.collection;
        };

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

        // <module>/STORE mutation definition
        mutations[storeMutationName] = (state, elements) =>
        {
            state.collection = elements;
        };

        // <module>/ADD mutation definition
        mutations[addMutationName] = (state, elements) =>
        {
            if(elements.constructor !== Array)
            {
                elements = [elements];
            }

            // This collection buffer will be used in order to improve performances.
            // The changes to the state will be applied (triggering Vue to re-render) only when all
            // the elements have been added to the state.
            let collectionBuffer = state.collection.slice(0);

            elements.forEach(element =>
            {
                if(!element.id) return;

                let index = collectionBuffer.findIndex(item => item.id === element.id);

                if(index < 0)
                {
                    collectionBuffer.push(element);
                }
                else
                {
                    collectionBuffer[index] = Object.assign(collectionBuffer[index], element);
                }
            });

            state.collection = collectionBuffer.slice(0);
        };

        // <module>/DELETE mutation definition
        mutations[deleteMutationName] = (state, element) =>
        {
            let index = state.collection.findIndex(item => item.id === element.id);

            state.collection.splice(index, 1);
        };

        return mutations;
    }

    /**
     * State definition.
     */
    state()
    {
        return {
            collection: []
        };
    }

    /**
     * Get the module name (based on the class name).
     *
     * @protected
     */
    getModuleName()
    {
        return this.moduleName;
    }
}