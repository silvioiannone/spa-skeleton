import _                     from 'lodash';
import { Store }             from 'vuex';
import { Config }            from '../../../../Config';
import { ResponseInterface } from '../../../Api/ResponseInterface';
import { Module }            from '../../../State/Module';

/**
 * State machine App module.
 */
export class App extends Module
{
    /**
     * Module name.
     */
    protected name: string = 'app';

    /**
     * Define the App module actions.
     */
    protected actions(): any
    {
        return {

            /**
             * Update the settings.
             */
            'app/SETTINGS_UPDATE':
                async (store: Store<any>, payload: any): Promise<ResponseInterface> => {
                    let response = await this.api.app.updateSetting(payload.key, payload.value);

                    store.commit('app/SET', {
                        key: 'settings',
                        value: response.body.data
                    });

                    return response;
                },

            /**
             * Update a user setting.
             */
            'app/USER_SETTINGS_UPDATE':
                async (store: Store<any>, payload: any): Promise<ResponseInterface> => {
                    let user = store.getters.app.user;
                    let settings = _.set(user.settings, payload.key, payload.value);

                    let response = await this.api.users.update({
                        id: user.id,
                        settings
                    });

                    store.commit('app/INSERT', {
                        key: 'user',
                        value: response.body.data
                    });

                    return response;
                }
        };
    }

    /**
     * Define the APP module getters.
     */
    protected getters(): any
    {
        return {
            app: (state: any): any => state,

            ui: (state: any): any => {
                return {
                    /**
                     * Whether there are active filters.
                     */
                    isFiltering: (): boolean => {
                        let filtersCount = 0;

                        state.ui.pagination.filters.forEach((filter: any) => {
                            let value = filter.value;
                            if (Array.isArray(value) || typeof value === 'string') {
                                if (value.length) {
                                    filtersCount++
                                }
                            } else if (value) {
                                filtersCount++
                            }
                        });

                        return !! filtersCount;
                    },

                    /**
                     * Whether there are active sorts.
                     */
                    isSorting: (): boolean => {
                        return !! state.ui.pagination.sort?.length;
                    }
                }
            }
        }
    }

    /**
     * Define the APP module mutations.
     */
    protected mutations(): any
    {
        return {

            /**
             * Merge the given state with the app state.
             */
            'app/INSERT'(state: any, newState: any): void
            {
                state = _.merge(state, newState);
            },

            /**
             * Set the give state key to the given value.
             */
            'app/SET'(state: any, payload: { key: string; value: any }): void
            {
                state = _.set(state, payload.key, payload.value);
            },

            /**
             * Set the error preventing the app from loading.
             */
            'app/SET_ERROR'(state: any, error: any): void
            {
                state.error = error;
            },

            /**
             * Set the app settings.
             */
            'app/SET_SETTINGS'(state: any, settings: any): void
            {
                state.settings = settings;
            },

            /**
             * Set the app's status.
             */
            'app/SET_STATUS'(state: any, status: any): void
            {
                state.status = status;

                if (status === 'ready') {
                    state.fresh = false;
                }
            },

            /**
             * Show or hide the left navigationDrawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any): void
            {
                state.ui.navigationDrawers.leftVisible = value;
            },

            /**
             * Show or hide the right navigationDrawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any): void
            {
                state.ui.navigationDrawers.rightVisible = value;
            },

            /**
             * Show or hide the notifications-drawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY'(state: any, value: any): void
            {
                state.ui.navigationDrawers.notificationsVisible = value;
            },

            /**
             * Store the authenticated user.
             */
            'user/STORE_AUTHENTICATED_USER'(state: any, user: any): void
            {
                state.user = user;
            },

            /**
             * Update the authenticated user.
             */
            'user/UPDATE_AUTHENTICATED_USER'(state: any, user: any): void
            {
                let oldUser = state.user;

                state.user = Object.assign(oldUser, user);
            },

            /**
             * Remove the authenticated user.
             *
             * @param state
             */
            'user/REMOVE_AUTHENTICATED_USER'(state: any): void
            {
                state.user.id = null;
            },

            /**
             * Change a setting for the authenticated user.
             *
             * @param state
             * @param params
             */
            'user/CHANGE_SETTING'(state: any, params: any): void
            {
                Object.assign(state.user.settings, params);
            }
        };
    }

    /**
     * Define the APP state.
     */
    protected state(): any
    {
        return {

            /**
             * App configuration.
             */
            config: Config,

            /**
             * App settings.
             */
            settings: null,

            /*
             * Marks whether the app just finished loading or not.
             */
            fresh: true,

            /**
             * Router related settings and state.
             */
            router: {

                /**
                 * Hold the history of the latest `historyCount` routes visited.
                 */
                history: [],

                /**
                 * Number of routes that should be stored in the history.
                 */
                historyCount: 5
            },

            /*
             * The app status.
             */
            status: 'loading',

            /*
             * The error preventing the app from loading.
             */
            error: null,

            /*
             * Whether there's an available update.
             */
            updateAvailable: false,

            /*
             * UI state.
             */
            ui: {

                /**
                 * The callback that will be used when the user performs a search in the current
                 * view.
                 *
                 * Setting the callback will cause the main toolbar to display a search form.
                 */
                search: null,

                /**
                 * The visibility state of the navigation drawers.
                 */
                navigationDrawers: {
                    notificationsVisible: false,
                    rightVisible: false,
                    leftVisible: true
                },

                /**
                 * Stores the pagination object for views displaying paginated data.
                 */
                pagination: {
                    descending: false,
                    filters: [],
                    page: 1,
                    per_page: Config.app.paginationSize,
                    sort: ''
                },

                /**
                 * Toolbar state.
                 */
                toolbar: {

                    /**
                     * Breadcrumbs displayed by the toolbar.
                     */
                    breadcrumbs: []
                }
            },

            /*
             * The currently logged in user.
             */
            user: {},
        }
    }
}
