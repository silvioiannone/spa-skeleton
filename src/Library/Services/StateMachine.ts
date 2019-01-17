import Log                   from './Logger';
import Vue                   from 'vue';
import Vuex, { Store }       from 'vuex';
import VuexORM               from '@vuex-orm/core';
import Service               from './Service';
import Modules               from '../../../../../resources/ts/App/State';
import Models                from '../App/State/Models';
import { Plugin as ApiSync } from './StateMachine/VuexOrm/Plugins/ApiSync/Plugin';

// Skeleton modules
import App  from '../App/State/Modules/App';
import View from '../App/State/Modules/View';

const SkeletonModules = {
    App,
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
    protected static store: Store<StoreType>;

    /**
     * Boot the state machine.
     */
    boot(): void
    {
        Vue.use(Vuex);

        this.init();
    }

    /**
     * Get the store.
     */
    static getStore()
    {
        return StateMachine.store;
    }

    /**
     * Initialize the store.
     */
    protected init()
    {
        const database = new VuexORM.Database;

        // Register all the models with the state machine
        for (let key in Models) {
            Log.debug(`Model "${key}" registered.`);
            database.register(Models[key]);
        }

        VuexORM.use(ApiSync);

        // Set the state machine configuration.
        let configuration = {
            modules: {},
            plugins: [VuexORM.install(database)]
        };

        let availableModules = {...SkeletonModules, ...Modules};

        for (let key in availableModules) {
            let module = new availableModules[key]();
            configuration.modules[module.getName()] = module.get();
            Log.debug(`State machine "${key}" module registered.`);
        }

        StateMachine.store = new Vuex.Store(configuration);
    }
}
