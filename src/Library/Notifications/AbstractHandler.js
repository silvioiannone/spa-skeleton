/**
 * This class is an abstract handler that should be extend by every handler.
 *
 * @abstract
 */
export default class AbstractHandler
{
    /**
     * Constructor.
     *
     * @param vue
     */
    constructor(vue)
    {
        /**
         * The vue context.
         */
        this.vue= vue;
    }

    /**
     * Handle the notification.
     *
     * @param notification
     */
    handle(notification)
    {
        console.log('handling');
    }
}
