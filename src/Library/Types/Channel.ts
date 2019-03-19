import { Channel as ChannelInterface } from '../Interfaces/Channel';
import AbstractChannel                 from '../WebSocket/AbstractChannel';

/**
 * Describe a WebSocket channel type.
 */
export type Channel = ChannelInterface | typeof AbstractChannel | (new () => AbstractChannel);

export default Channel;
