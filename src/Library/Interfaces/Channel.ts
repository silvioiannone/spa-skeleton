/**
 * Interface describing a WebSocket channel.
 */
export interface Channel
{
    /**
     * Whether the channel is private.
     */
    isPrivate: () => boolean;

    /**
     * Whether the user can enter the channel.
     */
    canEnter: () => boolean;

    /**
     * The name of the channel.
     */
    name: () => string;
}
