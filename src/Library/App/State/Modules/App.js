import AbstractModule from '../../../State/AbstractModule';
import Token          from '../../../API/Token';

/**
 * State machine user module.
 */
export default class APP extends AbstractModule
{
    constructor()
    {
        super();

        this.moduleName = 'app';
    }

    actions()
    {
        let self = this;

        return {

            /**
             * Fetch a user.
             *
             * @param store
             * @param params
             * @returns {Promise}
             */
            'user/FETCH'(store, params)
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
                        .then(response =>
                        {
                            // If the user was correctly logged in, save the data in the store.
                            store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                            resolve();
                        })
                        .catch(error => reject(error));
                });
            },

            /**
             * Log in a user.
             *
             * @param store
             * @param userCredentials
             * @returns {Promise}
             */
            'user/LOGIN'(store, userCredentials)
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users.login(userCredentials)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                });
            },

            /**
             * Log out a user.
             *
             * @param store
             * @return {Promise}
             */
            'user/QUIT'(store)
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users.quit()
                        .then(response =>
                        {
                            resolve(response);
                            (new Token()).remove();
                            store.commit('user/REMOVE_AUTHENTICATED_USER');
                        })
                        .catch(error => reject(error));
                })
            },

            /**
             * Set a setting.
             *
             * @param store
             * @param {Object} params Accepted format: {
             *     setting: <string>,
             *     value: <any>
             * }
             * @returns {Promise}
             */
            'user/SET_SETTING'(store, params)
            {
                store.commit('user/CHANGE_SETTING', params);

                return new Promise((resolve, reject) =>
                {
                    self.api.users.update(store.getters.app.user)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                });
            },

            /**
             * Update the user.
             *
             * @param store
             * @param params
             * @return {Promise}
             */
            'user/UPDATE'(store, params)
            {
                return new Promise((resolve, reject) =>
                {
                    self.api.users.update(params)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                });
            }
        }
    }

    /**
     * Define the APP module getters.
     */
    getters()
    {
        return {

            /**
             * Whether the app from the state.
             *
             * @param state
             */
            'app': state => state,
        }
    }

    /**
     * Define the APP module mutations.
     */
    mutations()
    {
        return {

            /**
             * Set the app's status.
             */
            'app/SET_STATUS'(state, status)
            {
                state.status = status;

                if (status === 'ready') {
                    state.fresh = false;
                }
            },

            /**
             * Store the authenticated user.
             *
             * @param state
             * @param {Object} user User data
             */
            'user/STORE_AUTHENTICATED_USER'(state, user)
            {
                state.user = user;
            },

            /**
             * Update the authenticated user.
             *
             * @param state
             * @param user
             */
            'user/UPDATE_AUTHENTICATED_USER'(state, user)
            {
                let oldUser = state.user;

                state.user = Object.assign(oldUser, user);
            },

            /**
             * Remove the authenticated user.
             *
             * @param state
             */
            'user/REMOVE_AUTHENTICATED_USER'(state)
            {
                state.user.id = null;
            },

            /**
             * Change a setting for the authenticated user.
             *
             * @param state
             * @param params
             */
            'user/CHANGE_SETTING'(state, params)
            {
                Object.assign(state.user.settings, params);
            }
        };
    }

    /**
     * Define the APP state.
     */
    state()
    {
        return {

            /*
             * Marks whether the app just finished loading or not.
             */
            fresh: true,

            /*
             * The app status.
             */
            status: null,

            /*
             * The currently logged in user.
             */
            user: {},
        }
    }
}
