/**
 * Interface describing a WebSocket channel.
 */
export interface Channel
{
    isPrivate: () => boolean;
    canEnter: () => boolean;
    name: () => string;
}

export default Channel;
