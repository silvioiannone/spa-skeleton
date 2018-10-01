import Log from 'loglevel';
import AppFilters from 'js/App/Filters';

// Skeleton filters
import FileSize from './Filters/FileSize';
import OrganizationNumber from './Filters/OrganizationNumber';
import Phone from './Filters/Phone';

const SkeletonFilters = {
    fileSize: FileSize,
    organizationNumber: OrganizationNumber,
    phone: Phone
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
