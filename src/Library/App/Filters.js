import Log from 'loglevel';
import AppFilters from 'assets/js/App/Filters';

// Skeleton filters
import OrganizationNumber from './Filters/OrganizationNumber';

const SkeletonFilters = {
    organizationNumber: OrganizationNumber
};

/**
 * This class will register the Vue filters.
 */
export default class Filters
{
    constructor(vue)
    {
        this.vue = vue;
    }

    /**
     * Bind the filters.
     */
    boot()
    {
        Log.debug('Loading filters...');

        let availableFilters = {};
        Object.assign(availableFilters, SkeletonFilters, AppFilters);

        for (let key in availableFilters) {
            Log.debug('Filter "' + key + '" registered.');
            this.vue.filter(key, availableFilters[key]);
        }

        Log.debug('Filters loaded.');
    }
}