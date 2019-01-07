import ApiFactory, { ApiClient } from 'spa-skeleton/src/Library/Api';

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
    protected api: ApiClient;

    /**
     * Constructor.
     */
    constructor()
    {
        this.api = ApiFactory.make();
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
     * Get the module name.
     */
    getName()
    {
        return this.name;
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
