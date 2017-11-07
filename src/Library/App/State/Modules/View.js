import AbstractModule from '../../../State/AbstractModule';

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
        actions['view/HOME'] = store =>
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
                        'with': 'role'
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
                        'with': 'role'
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
}
