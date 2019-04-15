import { ApiFactory, ApiClient } from 'spa-skeleton/src/Library/Api';

/**
 * Abstract state machine module.
 */
export abstract class Module
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
    protected constructor()
    {
        this.api = ApiFactory.make();
    }

    /**
     * Return the module structure.
     */
    public get(): any
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
    public getName(): string
    {
        return this.name;
    }

    /**
     * Define the actions here.
     */
    protected actions(): any
    {
        return {};
    }

    /**
     * Define the getters here.
     */
    protected getters(): any
    {
        return {};
    }

    /**
     * Define the mutations here.
     */
    protected mutations(): any
    {
        return {};
    }

    /**
     * Define the state here.
     */
    protected state(): any
    {
        return {};
    }
}
