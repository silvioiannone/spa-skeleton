import Vue            from 'vue';
import { Service }    from './Service';
import { Logger }     from './Logger';
import DirectivesList from '../../../../../resources/ts/App/Directives';

// Directives
import Autocomplete from '../App/Directives/Autocomplete';

// Skeleton directives
const SkeletonDirectives = {
    Autocomplete
};

/**
 * This service registers the Vue directives.
 */
export class Directives extends Service
{
    /**
     * The service's name.
     */
    public name: string = 'Directives';

    /**
     * Boot the service.
     */
    public static boot(): void
    {
        let availableDirectives = {...SkeletonDirectives, ...DirectivesList};

        for(let key in availableDirectives) {
            Vue.directive(key, availableDirectives[key]);

            Logger.debug('Directive "' + key + '" registered.');
        }
    }
}
