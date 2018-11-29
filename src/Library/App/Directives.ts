import Log            from 'loglevel';
import Vue            from 'vue';
import DirectivesList from '../../../../../resources/ts/App/Directives';

// Skeleton directives
const SkeletonDirectives = {
}

/**
 * Initialize and manage the custom directives.
 */
export default class Directives
{
    /**
     * Register the custom directives.
     */
    boot()
    {
        Log.debug('Booting directives...');

        let availableDirectives = {...SkeletonDirectives, ...DirectivesList};

        for(let key in availableDirectives)
        {
            Vue.directive(key, availableDirectives[key]);

            Log.debug('Directive "' + key + '" registered.');
        }

        Log.debug('Directives ready.');
    }
}
