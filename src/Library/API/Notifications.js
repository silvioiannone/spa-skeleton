import AbstractResource from './AbstractResource';

/**
 * Notifications resource.
 */
export default class Notifications extends AbstractResource
{
    constructor()
    {
        super();

        this.resourceName = 'notifications';
    }

    /**
     * Mark the notification as read.
     *
     * @param notification
     * @returns {Promise}
     */
    markAsRead(notification)
    {
        return this._patch('markAsRead', notification);
    }
}
