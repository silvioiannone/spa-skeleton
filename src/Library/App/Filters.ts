import Log        from 'loglevel';
import Vue        from 'vue';
import { Store }  from 'vuex';
import AppFilters from '../../../../../resources/ts/App/Filters';

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
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Constructor.
     *
     * @param store
     */
    constructor(store: Store<any>)
    {
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
            Vue.filter(key, filter);
            Log.debug('Filter "' + key + '" registered.');
        }

        Log.debug('Filters loaded.');
    }
}
