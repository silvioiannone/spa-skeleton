import Vuex from 'vuex';
import Log  from 'loglevel';
import Modules from 'assets/js/App/State'

// Skeleton modules
import App   from './State/Modules/App';
import Users from './State/Modules/Users';
import UI    from './State/Modules/UI';
import View  from './State/Modules/View';

const SkeletonModules = {
    App,
    Users,
    UI,
    View
}

/**
 * Initialize and manage the state machine.
 */
export default class State
{
    /**
     * @param Vue Vue instance.
     */
    constructor(Vue)
    {
        this.vue = Vue;
    }

    /**
     * Boot the state machine.
     */
    boot()
    {
        Log.debug('Booting state machine...');

        this.vue.use(Vuex);

        Log.debug('State machine ready.');

        return this;
    }

    /**
     * Get the store.
     *
     * @returns {*}
     */
    getStore()
    {
        // Register all the modules with the state machine
        let availableModules = {};
        let vuexModules = {};

        for (let key in SkeletonModules) {
            let module = (new SkeletonModules[key]()).get();

            // See if there are app modules defined with the same key. If that's the case we need to
            // merge the app module with its skeleton module counterpart.
            if (typeof Modules[key] !== 'undefined') {
                let appModule = (new Modules[key]());
                module = Object.assign(module, appModule.get());
            }

            Log.debug('State machine "' + key + '" module registered.');
            vuexModules[key] = module;
        }

        return new Vuex.Store({ modules: vuexModules });
    }
}
