import { BelongsToMany }   from '@vuex-orm/core';
import { AbstractHandler } from './AbstractHandler';
import Models              from '../App/State/Models';
import { ExtendedModel }   from '../Services/StateMachine/VuexOrm/Support/ExtendedModel';

interface EventDescription {
    model: string;
    type: string;
}

/**
 * This handler manages the model related events and keeps the state machine updated.
 */
export class ModelHandler extends AbstractHandler
{
    /**
     * A list of events that should be handled.
     *
     * The order of the events is important!
     */
    protected static knownEvents: string[] = [
        'Attached', 'Detached', 'Created', 'PivotUpdated', 'Updated', 'Deleted'
    ];

    /**
     * Maps each model event to a function that will process it.
     */
    protected eventProcessors = {
        Created: ModelHandler.createdProcessor,
        Updated: ModelHandler.updatedProcessor,
        Deleted: ModelHandler.deletedProcessor,
        Attached: ModelHandler.attachedProcessor,
        Detached: ModelHandler.detachedProcessor
    };

    /**
     * Handle the event.
     */
    public handle(event: string, message: any): void
    {
        let eventDescription = ModelHandler.describeEvent(event);

        ModelHandler.knownEvents.forEach((knownEvent): void => {
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
    protected static createdProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.insert({ data: message.data });
    }

    /**
     * Process the updated model event.
     */
    protected static updatedProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.update({
            where: message.data.id,
            data: message.data
        });
    }

    /**
     * Process the deleted model event.
     */
    protected static deletedProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.delete(message.data.id);
    }

    /**
     * Process the attached model event.
     */
    protected static attachedProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.insert({ data: message.data });

        let relationship = model.fields()[message.related] as BelongsToMany;

        if (! relationship) {
            console.error('Cannot process attached event: the related field "' + message.related +
                '" cannot be found on the model.');
            return;
        }

        if (! (relationship instanceof BelongsToMany)) {
            console.error('Wrong relationship type.');
            return;
        }

        message.ids.forEach((id: any): void => {
            let data = {};

            data[relationship.foreignPivotKey] = message.data.id;
            data[relationship.relatedPivotKey] = id;

            relationship.pivot.insert({ data });
        });
    }

    /**
     * Process the detached model event.
     */
    protected static detachedProcessor(model: typeof ExtendedModel, message: any): void
    {
        model.delete(message.data.id);
    }

    /**
     * Describe the event starting from its string representation.
     */
    protected static describeEvent(event: string): EventDescription
    {
        let bits = event.split('.');

        return {
            model: bits[1],
            type: bits[2]
        }
    }
}
