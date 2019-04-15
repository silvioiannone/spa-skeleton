import Vue from 'vue';

/**
 * Handles the events that will alter the state.
 */
export class AbstractHandler
{
    protected vue: Vue;

    /**
     * Constructor.
     *
     * @param vue
     */
    public constructor(vue: Vue)
    {
        this.vue = vue;
    }

    /**
     * Handle the event.
     */
    public handle(event: string, message: any): void
    {
        if(!this[event]) {
            throw 'The event handler method cannot be found. Event: ' + event + '.';
        }

        this[event](message);
    }
}
