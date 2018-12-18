import Log             from 'loglevel';
import Vue             from 'vue';
import Vuex, { Store } from 'vuex';
import Modules         from '../../../../../resources/ts/App/State';

// Skeleton modules
import App           from './State/Modules/App';
import Notifications from './State/Modules/Notifications';
import Roles         from './State/Modules/Roles';
import Users         from './State/Modules/Users';
import UI            from './State/Modules/UI';
import View          from './State/Modules/View';

const SkeletonModules = {
    App,
    Notifications,
    Roles,
    Users,
    UI,
    View
};

/**
 * Initialize and manage the state machine.
 */
export default class State
{
    protected store: Store<any> | null;

    constructor()
    {
        this.store = null;
    }

    /**
     * Boot the state machine.
     */
    boot(): State
    {
        Log.debug('Booting state machine...');

        Vue.use(Vuex);

        Log.debug('State machine ready.');

        return this;
    }

    /**
     * Get the store.
     */
    getStore(): Store<any>
    {
        // Make sure only once store instance is created.
        if (this.store) {
            return this.store;
        }

        // Register all the modules with the state machine
        let vuexModules = {};
        let availableModules = {...SkeletonModules, ...Modules};

        for (let key in availableModules) {
            let module = (new availableModules[key]()).get();

            Log.debug('State machine "' + key + '" module registered.');
            vuexModules[key] = module;
        }

        this.store = new Vuex.Store({ modules: vuexModules });

        return this.store;
    }
}
