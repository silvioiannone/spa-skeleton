import { ExtendedModel as Model }
    from '../../../Services/StateMachine/VuexOrm/Support/ExtendedModel';
import { ResponseInterface } from '../../../Api/ResponseInterface';

/**
 * Notification model.
 */
export class Notification extends Model
{
    public static entity: string = 'notifications';

    /**
     * Model fields.
     */
    public static fields(): any
    {
        return {
            id: this.attr(null),
            type: this.attr(''),
            notifiable_id: this.attr(null),
            notifiable_type: this.attr(''),
            data: this.attr([]),
            read_at: this.attr(null),
            created_at: this.attr(null),
            updated_at: this.attr(null)
        }
    }

    /**
     * Mark a notification as read.
     */
    public static $markAsRead(data: any): Promise<ResponseInterface>
    {
        let promise = Notification.api((api): Promise<ResponseInterface> =>
        {
            return api.notifications.markAsRead(data);
        });

        promise.then((response: ResponseInterface): void =>
        {
            Notification.insertOrUpdate(response.body);
        });

        return promise;
    }
}
