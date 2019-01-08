import Log                   from './Logger';
import Vue                   from 'vue';
import Vuex, { Store }       from 'vuex';
import VuexORM               from '@vuex-orm/core';
import Service               from './Service';
import Modules               from '../../../../../resources/ts/App/State';
import Models                from '../../../../../resources/ts/App/State/Models';
import { Plugin as ApiSync } from './StateMachine/VuexOrm/Plugins/ApiSync/Plugin';

// Skeleton modules
import App           from '../App/State/Modules/App';
import Notifications from '../App/State/Modules/Notifications';
import Roles         from '../App/State/Modules/Roles';
import Users         from '../App/State/Modules/Users';
import View          from '../App/State/Modules/View';

// Skeleton models
import Notification from '../App/State/Models/Notification';

const SkeletonModules = {
    App,
    //Notifications,
    //Roles,
    //Users,
    View
};

const SkeletonModels = {
    Notification
}

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

        const database = new VuexORM.Database;

        let availableModels = {...SkeletonModels, ...Models};

        // Register all the models with the state machine
        for (let key in availableModels) {
            Log.debug(`Model "${key}" registered.`);
            database.register(availableModels[key]);
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

        this.store = new Vuex.Store(configuration);

        return this.store;
    }
}
