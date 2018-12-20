import Vue            from 'vue';
import Service        from './Service';
import Logger         from './Logger';
import DirectivesList from '../../../../../resources/ts/App/Directives';

// Skeleton directives
const SkeletonDirectives = {
}

/**
 * This service registers the Vue directives.
 */
export default class Directives extends Service
{
    /**
     * The service's name.
     */
    name: string = 'Directives';

    /**
     * Boot the service.
     */
    boot(): void
    {
        let availableDirectives = {...SkeletonDirectives, ...DirectivesList};

        for(let key in availableDirectives)
        {
            Vue.directive(key, availableDirectives[key]);

            Logger.debug('Directive "' + key + '" registered.');
        }
    }
}
