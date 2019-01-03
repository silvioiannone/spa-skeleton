import Api from '../Api';

/**
 * Abstract state machine module.
 *
 * @abstract
 */
export default abstract class AbstractModule
{
    /**
     * Module name.
     */
    protected abstract name: string = '';

    /**
     * Api client.
     */
    protected api: Api

    /**
     * Constructor.
     */
    constructor()
    {
        this.api = new Api;
    }

    /**
     * Return the module structure.
     */
    get()
    {
        return {
            actions: this.actions(),
            getters: this.getters(),
            mutations: this.mutations(),
            state: this.state()
        }
    }

    /**
     * Define the actions here.
     */
    protected actions()
    {
        return {};
    }

    /**
     * Define the getters here.
     */
    protected getters()
    {
        return {};
    }

    /**
     * Define the mutations here.
     */
    protected mutations()
    {
        return {};
    }

    /**
     * Define the state here.
     */
    protected state()
    {
        return {};
    }
}
