/**
 * Handles the events that will alter the state.
 */
export default class AbstractHandler
{
    /**
     * Handle the event.
     *
     * @param {String} event
     * @param {Object} message
     */
    handle(event, message)
    {
        if(!this[event])
        {
            throw 'The event handler method cannot be found. Event: ' + event + '.';
        }
        
        this[event](message);
    }

    /**
     * Set the Vue context.
     *
     * @param vueContext
     */
    setVueContext(vueContext)
    {
        this.vue = vueContext;

        return this;
    }
}