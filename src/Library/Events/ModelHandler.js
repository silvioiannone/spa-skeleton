import AbstractHandler from './AbstractHandler';
import Pluralize       from 'pluralize';

/**
 * This handler performs basic tasks such as firing mutations for the right
 * state machine module.
 */
export default class GenericHandler extends AbstractHandler
{
    /**
     * @param vue
     */
    constructor(vue)
    {
        super(vue);

        /**
         * @type {string[]} A list of events that should be handled.
         */
        this.knownEvents = ['Created', 'Updated', 'Deleted'];

        /**
         * @type {string[]} A list of state modules that should be ignored.
         */
        this.excluded = []
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
        this.knownEvents.find(eventName =>
        {
            if(!event.endsWith(eventName)) return false;

            // Fetch the state module name from the event: '/Models/CampaignCreated' becomes
            // 'Campaign'
            let stateModule = event.replace(eventName, '');
            stateModule = /(\w+)$/.exec(stateModule)[0];

            // Check if the this state module should be ignored
            if(this.excluded.indexOf(stateModule) >= 0) return false;

            stateModule = stateModule.charAt(0).toLowerCase() + stateModule.slice(1);

            // Build the mutation string.
            let mutation = Pluralize(stateModule) + '/';

            switch (eventName)
            {
                case 'Created':
                case 'Updated':
                    mutation += 'ADD';
                    break;
                case 'Deleted':
                    mutation += 'DELETE';
                    break;
            }

            // Run the mutation on the state machine
            this.vue.$store.commit(mutation, message);

            return true;
        });
    }
}
