# State machine

## State machine modules

State machine modules define the functionality of each Vuex module in a class format.

Each module should extend the `spa-skeleton` provided `StateMachineModule` class and define the name
of the module itself by setting the `name` property.

    import { StateMachineModule } from `spa-skeleton`;

    export default class Companies extends StateMachineModule
    {
        /**
         * Module name.
         */
        protected name: string = 'companies';
    }

The `StateMachineModule` has methods which allow you to specify the structure and functionality of 
the module. It's enough to override these methods when needed.

Here is an example:

    import { StateMachineModule } from `spa-skeleton`;

    export default class Companies extends StateMachineModule
    {
        /**
         * Module name.
         */
        protected name: string = 'companies';
    }

    import AbstractModule from 'spa-skeleton/src/Library/State/AbstractModule';

    /**
     * State machine App module.
     */
    export default class App extends AbstractModule
    {
        constructor()
        {
            super();
            this.moduleName = 'app';
        }

        /**
         * Get the module's actions.
         */
        protected actions()
        {
            return {...};
        }
        
        /**
         * Define the getters here.
         */
        protected getters()
        {
            return {...};
        }
    
        /**
         * Define the mutations here.
         */
        protected mutations()
        {
            return {...};
        }
    
        /**
         * Define the state here.
         */
        protected state()
        {
            return {...};
        }
    }

    // resources/ts/App/State/Modules/Companies.ts

Once you have defined your state machine module you can import it in *resources/ts/App/State.ts*

    import App from './State/Modules/App'

    export default {
        App
    }

    // resources/assets/js/App/State.ts

New state machine modules can be defined in *resources/ts/App/State/Modules* and imported in
*resources/ts/App/State.ts*.

### Api access

From within a state machine module it's possible to access an API client using `this.api`.

## Usage

### In components

When state machine modules are imported they can be used inside Vue components:

    export default {

        computed: {

            companies()
            {
                return this.$store.getters.companies;
            }
        }
    }

## Included modules

The following modules are included:

- [App](StateMachine/Modules/App.md): Stores the state of the SPA.
- [View](StateMachine/Modules/View.md): Stores actions that need to be performed before loading each 
    view.

---
[More about state machine modules](https://vuex.vuejs.org/en/modules.html).
