import AbstractChannel from '../WebSocket/AbstractChannel';
import AbstractHandler from '../Events/AbstractHandler';

export type Channel = typeof AbstractChannel | (new () => AbstractChannel);

export interface Subscription {
    event: string,
    channels: Array<Channel>,
    handlers?: Array<typeof AbstractHandler>
}

export default Subscription;
