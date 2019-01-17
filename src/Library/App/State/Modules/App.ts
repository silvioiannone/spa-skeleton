import { Store }         from 'vuex';
import _                 from 'lodash';
import Module            from '../../../State/Module';
import Config            from '../../../../Config';
import ResponseInterface from '../../../Api/ResponseInterface';
import Token             from '../../../Api/Token';

/**
 * State machine App module.
 */
export default class APP extends Module
{
    /**
     * Module name.
     */
    protected name: string = 'app';

    /**
     * Define the App module actions.
     */
    protected actions()
    {
        let self = this;

        return {

            /**
             * Fetch a user.
             */
            'user/FETCH'(store: Store<any>, params: any): Promise<any>
            {
                return new Promise((resolve, reject) =>
                {
                    if(store.getters.app.user.id)
                    {
                        resolve();
                        return;
                    }

                    self.api.users
                        .setParameters({
                            with: 'role'
                        })
                        .get('me')
                        .then((response: ResponseInterface) =>
                        {
                            // If the user was correctly logged in, save the data in the store.
                            store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                            resolve();
                        })
                        .catch((error: any) => reject(error));
                });
            },

            /**
             * Log in a user.
             */
            'user/LOGIN'(store: Store<any>, userCredentials: any): Promise<any>
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users
                        .login(userCredentials)
                        .then((response: any) => resolve(response))
                        .catch((error: any) => reject(error));
                });
            },

            /**
             * Log out a user.
             */
            'user/QUIT'(store: Store<any>): Promise<any>
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users.quit()
                        .then((response: any) =>
                        {
                            resolve(response);
                            (new Token()).remove();
                            store.commit('user/REMOVE_AUTHENTICATED_USER');
                        })
                        .catch((error: any) => reject(error));
                })
            },

            /**
             * Set a setting.
             */
            'user/SET_SETTING'(store: Store<any>, params: any): Promise<any>
            {
                store.commit('user/CHANGE_SETTING', params);

                return new Promise((resolve, reject) =>
                {
                    self.api.users.update(store.getters.app.user)
                        .then((response: any) => resolve(response))
                        .catch((error: any) => reject(error));
                });
            },

            /**
             * Update the user.
             */
            'user/UPDATE'(store: Store<any>, params: any): Promise<any>
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users
                        .update(params)
                        .then((response: any) => resolve(response))
                        .catch((error: any) => reject(error));
                });
            }
        }
    }

    /**
     * Define the APP module getters.
     */
    protected getters()
    {
        return {
            'app': (state: any) => state,
        }
    }

    /**
     * Define the APP module mutations.
     */
    protected mutations()
    {
        return {

            /**
             * Merge the given state with the app state.
             */
            'app/insert'(state: any, newState: any): void
            {
                state = _.merge(state, newState);
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
            'ui/SET_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any)
            {
                state.ui.navigationDrawers.leftVisible = value;
            },

            /**
             * Show or hide the right navigationDrawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY'(state: any, value: any)
            {
                state.ui.navigationDrawers.rightVisible = value;
            },

            /**
             * Show or hide the notifications drawer.
             *
             * @param state
             * @param value
             */
            'ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY'(state: any, value: any)
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
            'user/REMOVE_AUTHENTICATED_USER'(state: any)
            {
                state.user.id = null;
            },

            /**
             * Change a setting for the authenticated user.
             *
             * @param state
             * @param params
             */
            'user/CHANGE_SETTING'(state: any, params: any)
            {
                Object.assign(state.user.settings, params);
            }
        };
    }

    /**
     * Define the APP state.
     */
    protected state()
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

            /*
             * The app status.
             */
            status: 'loading',

            /*
             * The error preventing the app from loading.
             */
            error: null,

            /*
             * UI state.
             */
            ui: {

                navigationDrawers: {
                    notificationsVisible: false,
                    rightVisible: false,
                    leftVisible: true
                },

                pagination: null
            },

            /*
             * The currently logged in user.
             */
            user: {},
        }
    }
}
