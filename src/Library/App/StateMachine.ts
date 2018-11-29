import Vue     from 'vue';
import Vuex    from 'vuex';
import Log     from 'loglevel';
import Modules from '../../../../../resources/ts/App/State';

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
    /**
     * Boot the state machine.
     */
    boot()
    {
        Log.debug('Booting state machine...');

        Vue.use(Vuex);

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
        let vuexModules = {};
        let availableModules = {...SkeletonModules, ...Modules};

        for (let key in availableModules) {
            let module = (new availableModules[key]()).get();

            Log.debug('State machine "' + key + '" module registered.');
            vuexModules[key] = module;
        }

        return new Vuex.Store({ modules: vuexModules });
    }
}
