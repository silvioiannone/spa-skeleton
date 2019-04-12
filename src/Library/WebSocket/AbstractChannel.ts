import { Store }    from 'vuex';
import StateMachine from '../Services/StateMachine';
import Channel      from '../Interfaces/Channel';

/**
 * A websocket channel.
 */
export default abstract class AbstractChannel implements Channel
{
    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Whether the channel is private or not.
     */
    protected private: boolean = true;

    /**
     * Constructor.
     */
    public constructor()
    {
        this.store = StateMachine.getStore();
    }

    /**
     * Whether the channel is private or not.
     */
    public isPrivate(): boolean
    {
        return this.private;
    }

    /**
     * Whether it's possible for the user to enter the channel.
     */
    public canEnter(): boolean
    {
        return true;
    }

    /**
     * Get the channel name.
     */
    abstract name(): string
}
