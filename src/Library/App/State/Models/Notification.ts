import { Model } from '@vuex-orm/core';

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
            notifiable_type: this.attr(''),
            notifiable_id: this.attr(null),
            data: this.attr([]),
            read_at: this.attr(null),
            created_at: this.attr(null),
            updated_at: this.attr(null)
        }
    }
}
