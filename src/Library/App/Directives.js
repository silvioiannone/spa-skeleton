import Log            from 'loglevel';
import DirectivesList from 'assets/js/App/Directives';

// Skeleton directives
import OnClick from './Directives/UI/OnClick';

const SkeletonDirectives = {
    'on-click': OnClick
}

/**
 * Initialize and manage the custom directives.
 */
export default class Directives
{
    /**
     * @param Vue Vue instance.
     */
    constructor(Vue)
    {
        this.vue = Vue;
    }

    /**
     * Register the custom directives.
     */
    boot()
    {
        Log.debug('Booting directives...');

        let availableDirectives = {};
        Object.assign(availableDirectives, SkeletonDirectives, DirectivesList);

        for(let key in availableDirectives)
        {
            this.vue.directive(key, availableDirectives[key]);

            Log.debug('Directive "' + key + '" registered.');
        }

        Log.debug('Directives ready.');
    }
}
