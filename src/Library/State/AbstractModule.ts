import ModuleInterface from 'spa-skeleton/src/Library/State/ModuleInterface';
import Api             from '../Api';

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
    protected name: string = '';

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
    get(): ModuleInterface
    {
        return {
            actions: this.actions(),
            mutations : this.mutations(),
            state : this.state(),
            getters: this.getters()
        }
    }

    /**
     * Define the actions here.
     */
    actions(): any
    {
        return {};
    };

    /**
     * Define the getters here.
     */
    getters(): any
    {
        return {};
    };

    /**
     * Define the mutations here.
     */
    mutations(): any
    {
        return {};
    };

    /**
     * Define the state here.
     */
    state(): any
    {
        return {}
    };
}
