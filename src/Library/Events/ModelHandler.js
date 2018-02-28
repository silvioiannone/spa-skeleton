import AbstractHandler from './AbstractHandler';
import Pluralize       from 'pluralize';

/**
 * This handler performs basic tasks such as firing mutations for the right
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
         * @type {string[]}
         */
        this.knownEvents = ['Created', 'Updated', 'Deleted', 'Attached'];

        /**
         * Maps each model event to a function that will process it.
         */
        this.eventProcessors = {
            'Attached': this.attachedProcessor,
            'Created': this.createdProcessor,
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
        // Split the event name in <stateModule><eventName>, for example a UserCreated will set model = 'user' and
        // event = 'created'.
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
        let mutation = this.getStateModuleName(event, 'Updated') + '/ADD';

        this.vue.$store.commit(mutation, message);
    }

    /**
     * Process a 'deleted' model event.
     *
     * @param event
     * @protected
     */
    deletedProcessor(event, message)
    {
        let mutation = this.getStateModuleName(event, 'Deleted') + '/DELETE';

        this.vue.$store.commit(mutation, message);
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
     * Get the name of the state module related to the event.
     *
     * @protected
     */
    getStateModuleName(event, modelEvent)
    {
        // Fetch the state module name from the event: '/Models/CampaignCreated' becomes 'Campaign'.
        let stateModule = event.replace(modelEvent, '');
        stateModule = /(\w+)$/.exec(stateModule)[0];
        stateModule = stateModule.charAt(0).toLowerCase() + stateModule.slice(1);
        return Pluralize(stateModule);
    }
}
