import Log             from 'loglevel';
import Vue             from 'vue';
import Vuex, { Store } from 'vuex';
import Service         from './Service';
import Modules         from '../../../../../resources/ts/App/State';

// Skeleton modules
import App           from '../App/State/Modules/App';
import Notifications from '../App/State/Modules/Notifications';
import Roles         from '../App/State/Modules/Roles';
import Users         from '../App/State/Modules/Users';
import UI            from '../App/State/Modules/UI';
import View          from '../App/State/Modules/View';

const SkeletonModules = {
    App,
    Notifications,
    Roles,
    Users,
    UI,
    View
};

export type StoreType = {
    [P in keyof (typeof SkeletonModules & typeof Modules)]
        : (typeof SkeletonModules & typeof Modules)[P];
};

/**
 * This service provides the application with a state machine.
 */
export default class StateMachine extends Service
{
    /**
     * Service name.
     */
    name: string = 'State Machine';

    /**
     * State machine store.
     */
    protected store: Store<StoreType> | null;

    /**
     * Boot the state machine.
     */
    boot(): void
    {
        Vue.use(Vuex);
    }

    /**
     * Get the store.
     */
    getStore(): Store<StoreType>
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
