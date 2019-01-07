import { Model } from '@vuex-orm/core';

/**
 * Notification model.
 */
export default class Notification extends Model
{
    static entity = 'notifications';

    /**
     * Model fields.
     */
    static fields()
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
