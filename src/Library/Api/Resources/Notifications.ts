import AbstractResource  from './AbstractResource';
import ResponseInterface from '../ResponseInterface';

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
    markAsRead(notification: any): Promise<ResponseInterface>
    {
        return this._patch('markAsRead', notification);
    }

    /**
     * Mark all notifications as read.
     *
     * @returns {Promise}
     */
    markAllAsRead(): Promise<ResponseInterface>
    {
        return this._post('markAsRead/all');
    }
}
