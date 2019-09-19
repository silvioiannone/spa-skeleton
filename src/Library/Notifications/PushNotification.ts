import Models                             from '../App/State/Models';
import PushJS, { PushNotificationParams } from 'push.js';
import Vue                                from 'vue';

/**
 * A notification.
 */
export abstract class PushNotification
{
    /**
     * Notification.
     */
    protected notification: any;

    /**
     * Default options.
     */
    private defaultOptions: PushNotificationParams = {
        icon: '/storage/favicons/apple-touch-icon.png'
    };

    /**
     * Push notification options.
     */
    protected options: PushNotificationParams = {
    };

    /**
     * Title of the notification.
     */
    protected title: string = '';

    /**
     * Vue instance.
     */
    protected vue: Vue;

    /**
     * Constructor.
     */
    protected constructor(vue: Vue, notification: any)
    {
        this.vue = vue;
        this.notification = notification;

        // We need to set the `onClick` parameter like this so that it has access to `this`.
        this.defaultOptions.onClick = (): void => {
            this.handleOnClick();
        };
    }

    /**
     * Show the notification.
     */
    public show(): void
    {
        PushJS.create(this.title, {
            ...this.defaultOptions,
            ...this.options
        });
    }

    /**
     * Handle the on click event.
     */
    protected handleOnClick(): void
    {
        this.onClick();
        window.focus();
        Models.Notification.$markAsRead(this.notification);
    }

    /**
     * Callback called when the notification is clicked.
     */
    protected onClick(): void
    {
    }
}
