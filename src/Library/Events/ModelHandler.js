import AbstractHandler from './AbstractHandler';
import Pluralize       from 'pluralize';

/**
 * This handler performs basic tasks such as committing mutations and dispatching for the right
 * state machine module.
 */
export default class ModelHandler extends AbstractHandler
{
    /**
     * @param vue
     */
    constructor(vue)
    {
        super(vue);

        /**
         * A list of events that should be handled.
         *
         * The order of the events is important!
         *
         * @type {string[]}
         */
        this.knownEvents = ['Attached', 'Created', 'PivotUpdated', 'Updated', 'Deleted',];

        /**
         * Maps each model event to a function that will process it.
         */
        this.eventProcessors = {
            'Attached': this.attachedProcessor,
            'Created': this.createdProcessor,
            'PivotUpdated': this.pivotUpdatedProcessor,
            'Updated': this.udpatedProcessor,
            'Deleted': this.deletedProcessor
        }

        /**
         * A list of state modules that should be ignored.
         *
         * @type {string[]}
         */
        this.excluded = [];
    }

    /**
     * Handle an event. (Not very helpful huh?)
     *
     * @override
     */
    handle(event, message)
    {
        // Split the event name in <stateModule><eventName>, for example a UserCreated will set
        // model = 'user' and event = 'created'.
        this.knownEvents.find(modelEvent =>
        {
            if(!event.endsWith(modelEvent)) {
                return false;
            }

            let stateModuleName = this.getStateModuleName(event, modelEvent);
            // Check if the this state module should be ignored.
            if(this.excluded.indexOf(stateModuleName) >= 0) {
                return false;
            }

            // Process the event.
            this.eventProcessors[modelEvent].apply(this, [event, message]);

            return true;
        });
    }

    /**
     * Process a 'created' model event.
     *
     * @param event
     * @param message
     * @protected
     */
    createdProcessor(event, message)
    {
        let mutation = this.getStateModuleName(event, 'Created') + '/ADD';

        this.vue.$store.commit(mutation, message);
    }

    /**
     * Process a 'updated' model event.
     *
     * @param event
     * @protected
     */
    udpatedProcessor(event, message)
    {
        let action = this.getStateModuleName(event, 'Updated') + '/UPDATE-LOCAL';

        this.vue.$store.dispatch(action, message.data);
    }

    /**
     * Process a 'deleted' model event.
     *
     * @param event
     * @protected
     */
    deletedProcessor(event, message)
    {
        // Use the <moduleName>/DELETE-LOCAL action to completely remove the resource locally.
        let action = this.getStateModuleName(event, 'Deleted') + '/DELETE-LOCAL';

        this.vue.$store.dispatch(action, message.data);
    }

    /**
     * Process an 'attached' model event.
     *
     * @param event
     * @protected
     */
    attachedProcessor(event, message)
    {
        let module = this.vue.$store.getters[this.getStateModuleName(event, 'Attached')];
        let model = module.find(model => model.id === message.data.id);

        if (model) {
            model[message.key].push(message.related);
        }
    }

    /**
     * Process a 'pivotUpdated' model event.
     *
     * @param event
     * @param message
     */
    pivotUpdatedProcessor(event, message)
    {
        let stateModuleName = this.getStateModuleName(event, 'PivotUpdated');
        let module = this.vue.$store.getters[stateModuleName];
        let model = module.find(current => current.id === message.model.id);
        let relatedModel = model[message.relation]
            .find(current => current.id === message.related.id);

        relatedModel.pivot = message.pivot;
    }

    /**
     * Get the name of the state module related to the event.
     *
     * @protected
     */
    getStateModuleName(event, modelEvent)
    {
        // Fetch the state module name from the event: '/Models/Campaign/Created' becomes 'Campaign'.
        let stateModule = /(\w+).\w+$/.exec(event)[1];
        stateModule = stateModule.charAt(0).toLowerCase() + stateModule.slice(1);
        return Pluralize(stateModule);
    }
}
