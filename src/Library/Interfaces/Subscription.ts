import AbstractHandler from '../Events/AbstractHandler';
import { Channel }     from '../Types/Channel';

export interface Subscription {
    event: string;
    channels: Channel[];
    handlers?: typeof AbstractHandler[];
}

export default Subscription;
