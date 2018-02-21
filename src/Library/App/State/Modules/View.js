import AbstractModule from '../../../State/AbstractModule';
import Config from 'spa-skeleton/src/Config'

/**
 * State machine view module.
 */
export default class View extends AbstractModule
{
    constructor()
    {
        super();

        this.moduleName = 'view';
    }

    actions()
    {
        let self = this;
        let actions = {};

        /**
         * /home route
         */
        actions['view/HOME'] = (store, payload) =>
        {
            return new Promise((resolve, reject) =>
            {
                let userId = store.getters.app.user.id;

                if(userId) {
                    resolve();
                    return;
                }

                self.api.users
                    .setParameters({
                        include: 'role'
                    })
                    .get('me')
                    .then(response =>
                    {
                        store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                        resolve();
                    })
                    .catch(error => reject(error));
            });
        };

        /**
         * /settings route
         */
        actions['view/SETTINGS'] = store =>
        {
            return new Promise((resolve, reject) =>
            {
                self.api.users
                    .setParameters({
                        include: 'role'
                    })
                    .get('me')
                    .then(response =>
                    {
                        store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                        resolve();
                    })
                    .catch(error => reject(error));
            });
        };

        return actions;
    }

    /**
     * Get the parameters that should be passed to the API if the view will display paginated data (a list of users for
     * example).
     *
     * @param payload
     * @return {Object}
     */
    getPaginationParameters (payload)
    {
        return {
            'page[number]': payload.route.query.page || 1,
            'page[size]': payload.route.query.size || Config.app.paginationSize,
            'sort': payload.route.query.sort || ''
        }
    }
}
