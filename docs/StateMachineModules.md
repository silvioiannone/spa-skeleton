# State machine modules

State machine modules define the functionality of each Vuex module in a class format.

Each module should extend the *spa-skeleton/src/Library/State/AbstractModule.js* class and define in 
its constructor the name of the module itself by setting the `moduleName` property.

    import AbstractModule from `spa-skeleton/src/Library/State/AbstractModule.js`

    constructor()
    {
        super();

        this.moduleName = 'users';
    }

The `AbstractModule` class has functions which allow you to specify the structure and functionality 
of the module. It's enough to override these methods when needed.

Here is an example:

    import AbstractModule from 'spa-skeleton/src/Library/State/AbstractModule';

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
            return {

                /**
                 * Fetch a user.
                 */
                'user/FETCH'(store, params)
                {
                    return new Promise((resolve, reject) =>
                    {
                        // do stuff
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
                app: state => state,
            }
        }

        /**
         * Define the APP module mutations.
         */
        mutations()
        {
            return {

                'app/SET_STATE_FAILED'(state)
                {
                    state.status = 'failed';
                },

                'app/SET_STATE_LOADING'(state)
                {
                    state.status = 'loading';
                }
            };
        }

        /**
         * Define the APP state.
         */
        state()
        {
            return {
                fresh: true,
                status: null,
                user: {},
            }
        }
    }

    // resources/assets/js/App/State/Modules/App.js

Once you have defined your state machine module you can import it in 
*resources/assets/js/App/State.js*

    import App from './State/Modules/App'

    export default {
        App
    }

    // resources/assets/js/App/State.js

New state machine modules can be defined in *resources/assets/js/App/State/Modules* and imported in
*resources/assets/js/App/State.js*.

## The Collection module

The `spa-skeleton` ships with a `CollectionModule` which handles collections of items and allows you
to easily store models in the state machine.

It defines the following mutations:

- `<moduleName>/ADD`: Adds the items to the state if possible.
- `<moduleName>/STORE`: Adds the items forgetting the already existing ones.
- `<moduleName>/DELETE`: Remove an item from the state machine.

The following getters are also available:

- `<moduleName>`: Get the items.
- `<moduleName>Meta`: Get the metadata (such as pagination information).

Usage is pretty straight forward:

    import CollectionModule from 'spa-skeleton/src/Library/State/CollectionModule';

    export default class Users extends CollectionModule
    {
        constructor()
        {
            super();
            this.moduleName = 'users';
        }
    }

## Usage

### In components

When state machine modules are imported they can be used inside Vue components:

    export default {

        computed: {

            users()
            {
                return this.$store.getters.users;
            }

            usersMeta()
            {
                return this.$store.getters.usersMeta;
            }
        }
    }

### Storing and adding items

When adding new items to the state machine the containing object must have the following structure:

    {
        // Required.
        data: [items]|{item},

        // Optional.
        meta: {

            // Holds the pagination information about the items
            pagination: {
                count:
                current_page: 1
                per_page: 25
                total: 73
                total_pages: 3
            }
        }
    }

## Included modules

In additon to the `CollectionModule` the following modules are included:

- `App`: Stores the state of the SPA.
- `Users`: A collection module storing users.
- `Notifications`: A collection module storing notifications.
- `UI`: Stores the state of the SPA's UI.
- `View`: Handles the actions that need to be performed before loading each view.

---
[More about state machine modules](https://vuex.vuejs.org/en/modules.html).