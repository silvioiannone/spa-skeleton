import AbstractModule from '../../../State/AbstractModule';

/**
 * User interface state machine module.
 */
export default class UI extends AbstractModule
{
    /**
     * Module name.
     */
    protected name: string = 'ui';

    /**
     * UI state gtters.
     */
    protected getters()
    {
        return {

            /**
             * Get the UI state.
             *
             * @param state
             */
            ui: (state: any) => state
        }
    }

    /**
     * UI state mutations.
     */
    protected mutations()
    {
        return {

            /**
             * Show or hide the left navigationDrawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any)
            {
                state.navigationDrawerVisible = value;
            },

            /**
             * Show or hide the right navigationDrawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any)
            {
                state.rightNavigationDrawerVisible = value;
            },

            /**
             * Show or hide the notifications drawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY'(state: any, value: any)
            {
                state.notificationsDrawerVisible = value;
            }
        }
    }

    /**
     * State definition.
     */
    protected state()
    {
        return {

            navigationDrawerVisible: true,

            rightNavigationDrawerVisible: false,

            notificationsDrawerVisible: false
        }
    }
}
