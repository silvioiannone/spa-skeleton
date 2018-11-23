import Log        from 'loglevel';
import AppFilters from 'js/App/Filters';

// Skeleton filters
import Capitalize         from './Filters/Capitalize';
import Currency           from './Filters/Currency';
import Date               from './Filters/Date';
import FileSize           from './Filters/FileSize';
import OrganizationNumber from './Filters/OrganizationNumber';
import Phone              from './Filters/Phone';
import ReadableDate       from './Filters/ReadableDate';

const SkeletonFilters = {
    capitalize: Capitalize,
    currency: Currency,
    date: Date,
    readableDate: ReadableDate,
    fileSize: FileSize,
    organizationNumber: OrganizationNumber,
    phone: Phone
};

/**
 * This class will register the Vue filters.
 */
export default class Filters
{
    /**
     * Constructor.
     *
     * @param vue
     * @param store
     */
    constructor(vue, store)
    {
        this.vue = vue;
        this.store = store;
    }

    /**
     * Bind the filters.
     */
    boot()
    {
        Log.debug('Loading filters...');

        let availableFilters = {... SkeletonFilters, ...AppFilters};

        for (let key in availableFilters) {
            let filter = (new availableFilters[key](this.store)).run.bind(this);
            this.vue.filter(key, filter);
            Log.debug('Filter "' + key + '" registered.');
        }

        Log.debug('Filters loaded.');
    }
}
