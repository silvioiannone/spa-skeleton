import API from '../API';

/**
 * Abstract state machine module.
 *
 * @abstract
 */
export default class AbstractModule
{
    constructor()
    {
        this.api = new API;
        this.moduleName = '';
    }

    /**
     * Return the module structure.
     *
     * @returns Object
     */
    get()
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
    actions() {};

    /**
     * Define the getters here.
     *
     * @abstract
     */
    getters() {};

    /**
     * Define the mutations here.
     *
     * @abstract
     */
    mutations() {};

    /**
     * Define the state here.
     *
     * @abstract
     */
    state() {};
}
