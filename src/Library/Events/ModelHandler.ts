import AbstractHandler   from './AbstractHandler';
import Models            from '../App/State/Models';
import { ExtendedModel } from '../Services/StateMachine/VuexOrm/Support/ExtendedModel';

interface EventDescription {
    model: string,
    type: string
}

/**
 * This handler manages the model related events and keeps the state machine updated.
 */
export default class ModelHandler extends AbstractHandler
{
    /**
     * A list of events that should be handled.
     *
     * The order of the events is important!
     */
    protected static knownEvents: Array<string> = [
        'Attached', 'Created', 'PivotUpdated', 'Updated', 'Deleted'
    ];

    /**
     * Maps each model event to a function that will process it.
     */
    protected eventProcessors = {
        'Created': this.createdProcessor,
        'Updated': this.updatedProcessor
    }

    /**
     * Handle the event.
     */
    handle(event: string, message: any)
    {
        let eventDescription = this.describeEvent(event);

        ModelHandler.knownEvents.forEach(knownEvent =>
        {
            if (eventDescription.type !== knownEvent) {
                return;
            }

            let model = Models[eventDescription.model];

            if (! model) {
                return;
            }

            let eventProcessor = this.eventProcessors[eventDescription.type];

            if (! eventProcessor) {
                return;
            }

            eventProcessor(model, message);
        });
    }

    /**
     * Process the created model event.
     */
    protected createdProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.insert(message);
    }

    /**
     * Process the the update model event.
     */
    protected updatedProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.update({
            where: message.data.id,
            data: message.data
        });
    }

    /**
     * Describe the event starting from its string representation.
     */
    protected describeEvent(event: string): EventDescription
    {
        let bits = event.split('.');

        return {
            model: bits[1],
            type: bits[2]
        }
    }
}
