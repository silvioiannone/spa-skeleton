import { AbstractHandler } from '../Events/AbstractHandler';
import { Channel }         from '../Types/Channel';

/**
 * Event subscription description.
 */
export interface Subscription {

    /**
     * Event.
     */
    event: string;

    /**
     * Channels where the event is broadcasted.
     */
    channels: Channel[];

    /**
     * Event handlers.
     */
    handlers?: typeof AbstractHandler[];
}
