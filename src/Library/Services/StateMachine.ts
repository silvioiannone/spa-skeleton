import _               from 'lodash';
import Log             from './Logger';
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
    protected store: Store<StoreType>;

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
    getStore()
    {
        // Make sure only once store instance is created.
        if (this.store) {
            return this.store;
        }

        // Register all the modules with the state machine
        let vuexModules = { modules: {}};
        let availableModules = _.merge(Modules, SkeletonModules);

        for (let key in availableModules) {
            vuexModules.modules[key.toLowerCase()] = (new availableModules[key]()).get();
            Log.debug('State machine "' + key + '" module registered.');
        }

        this.store = new Vuex.Store(vuexModules);

        return this.store;
    }
}
