import AbstractModule    from '../../../State/AbstractModule';
import Config            from 'spa-skeleton/src/Config';
import ResponseInterface from '../../../API/ResponseInterface';
import { Store }         from 'vuex';

/**
 * State machine view module.
 */
export default class View extends AbstractModule
{
    constructor()
    {
        super();

        this.name = 'view';
    }

    actions()
    {
        let self = this;
        let actions = {};

        // / route.
        actions['view/ROOT'] = (store: Store<any>, payload: any) =>
        {
            return new Promise((resolve, reject) =>
            {
                if (store.getters.app.settings) {
                    resolve();
                    return;
                }

                self.api.app.getSettings()
                    .then((response: ResponseInterface) =>
                    {
                        store.commit('app/SET_SETTINGS', response.body.data);
                        resolve();
                    })
                    .catch((error: any) => reject(error));
            })
        };

        /**
         * /home route
         */
        actions['view/HOME'] = (store: Store<any>, payload: any) =>
        {
            return new Promise((resolve, reject) =>
            {
                let userId = store.getters.app.user.id;

                if (userId) {
                    resolve();
                    return;
                }

                self.api.users
                    .setParameters({
                        include: 'role,unread_notifications'
                    })
                    .find('me')
                    .then((response: ResponseInterface) =>
                    {
                        let user = response.body.data;

                        store.commit('user/STORE_AUTHENTICATED_USER', user);
                        store.commit('notifications/STORE', {data: user.unread_notifications});
                        resolve();
                    })
                    .catch((error: any) => reject(error));
            });
        };

        /**
         * /settings route
         */
        actions['view/SETTINGS'] = (store: Store<any>) =>
        {
            return new Promise((resolve, reject) =>
            {
                let userId = store.getters.app.user.id;

                if (userId) {
                    resolve();
                    return;
                }

                self.api.users
                    .setParameters({
                        include: 'role'
                    })
                    .find('me')
                    .then((response: ResponseInterface) =>
                    {
                        store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                        resolve();
                    })
                    .catch((error: any) => reject(error));
            });
        };

        return actions;
    }

    /**
     * Get the parameters that should be passed to the API if the view will display paginated data
     * (a list of users for example).
     *
     * @param defaultParameters
     * @param payload
     * @return {Object}
     */
    getQueryParameters(payload: any, defaultParameters: any = {})
    {
        let pageSizeParameter = Config.app.paginationSize;
        if (defaultParameters['page[size]']) {
            pageSizeParameter = defaultParameters['page[size]'];
        }
        if (payload.route.query.size) {
            pageSizeParameter = payload.route.query.size;
        }

        let parameters = {
            'page[number]': payload.route.query.page || 1,
            'page[size]': pageSizeParameter
        }

        let sortParameter = payload.route.query.sort || defaultParameters.sort || null;
        if (sortParameter) {
            parameters['sort'] = sortParameter;
        }

        let searchParameter = payload.route.query.search || null;
        if (searchParameter) {
            parameters['search'] = searchParameter;
        }

        return parameters;
    }
}
