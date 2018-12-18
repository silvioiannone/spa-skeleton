import Vue from 'vue';

/**
 * Handles the events that will alter the state.
 */
export default class AbstractHandler
{
    protected vue: Vue;

    /**
     * Constructor.
     *
     * @param vue
     */
    constructor(vue: Vue)
    {
        this.vue = vue;
    }

    /**
     * Handle the event.
     */
    handle(event: string, message: any)
    {
        if(!this[event])
        {
            throw 'The event handler method cannot be found. Event: ' + event + '.';
        }

        this[event](message);
    }
}
