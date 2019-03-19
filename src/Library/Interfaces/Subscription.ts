import AbstractHandler from '../Events/AbstractHandler';
import { Channel }     from '../Types/Channel';

export interface Subscription {
    event: string,
    channels: Array<Channel>,
    handlers?: Array<typeof AbstractHandler>
}

export default Subscription;
