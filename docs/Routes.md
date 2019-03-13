# Routes

New routes must be defined in the *resources/ts/App/Routes.ts*:

    export default [

        // Route of the view.
        path: '/home',

        // Component that should render the view.
        component: Component,

        meta: {
        
            // List of guards that will be run before running the view actions.
            guards: ['Auth'],
        
            // Actions that should be run before displaying the view.
            actions: ['view/HOME']
        },

        // Children routes definition
        children: [
            {
                path: '',
                components: {
                    default: DefaultComponent,
                    toolbar: ToolbarComponent,
                    navigationDrawer: NavigationDrawerComponent
                }
            }
        ]
    ]

## Route guards

Route guards act as a middleware while loading the view. They allow to stop or allow the loading of 
the view.

Here is an example of a Guard that checks if the user is authenticated:

    import AbstractGuard from 'spa-skeleton/src/Library/Guards/AbstractGuard';

    export default class UserIsAdmin extends AbstractGuard
    {
        constructor(store)
        {
            super(store);
    
            this.guardName = 'UserIsAdmin';
        }
    
        /**
         * Run the guard.
         *
         * @return {Promise}
         */
        handle()
        {
            return new Promise((resolve, reject) =>
            {
                this.store.getters.app.user.role.name === 'administrator' ?
                    resolve() : reject('You\'re not an administrator. Go away.');
            });
        }
    }
    
    // resources/ts/App/Guards/UserIsAdmin.ts

The `handle()` method must return a promise.

Once the guard is defined you can import it in *resources/ts/App/Guards.ts*:

    import UserIsAdmin from './Guards/UserIsAdmin';
    
    export default {
        UserIsAdmin
    }
    
    // resources/ts/App/Guards.ts

After the guard is imported it can be used to protect a route:

    export default [
        path: '/home',
        meta: {
            guards: ['UserIsAdmin']
        }
    ]

## Route actions

Route actions define the steps to execute before a view is loaded. This usually includes querying 
the data needed and committing it to the state machine.

As you can see from the first example the route definition's `meta` has a `actions` property. This 
just the state machine module action that will be executed.

You can define an action for each view. For example, using the *View.js* state machine module:

    import SkeletonViewModule from 'spa-skeleton/src/Library/App/State/Modules/View';
    import ObjectUtil from 'spa-skeleton/src/Library/Utils/Objects';
    
    /**
     * State machine view module.
     */
    export default class View extends SkeletonViewModule
    {
        constructor()
        {
            super();
            this.moduleName = 'view';
        }
    
        actions()
        {
            let self = this;
            let actions = super.actions();
            let api = this.api;
    
            actions['view/USER'] = (store, payload) =>
            {
                return new Promise((resolve, reject) =>
                {
                    let userId = store.getters.app.user.id;
    
                    self.api.users
                        .find(parseInt(payload.route.params.id))
                        .then(response =>
                        {
                            let user = response.body.data;
    
                            store.commit('users/STORE', user);
                            store.commit('notifications/STORE', {data: user.unread_notifications});
                            resolve();
                        })
                        .catch(error => reject(error));
                });
            }
        }
    }

Once the routes's actions resolve the view is loaded.

---
[More info about the routes](https://router.vuejs.org/en/).
