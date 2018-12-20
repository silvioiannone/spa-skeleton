import Vue          from 'vue';
import { Store }    from 'vuex';
import Logger       from './Logger';
import Service      from './Service';
import StateMachine from './StateMachine';
import AppFilters   from '../../../../../resources/ts/App/Filters';

// Skeleton filters
import Capitalize         from '../App/Filters/Capitalize';
import Currency           from '../App/Filters/Currency';
import Date               from '../App/Filters/Date';
import FileSize           from '../App/Filters/FileSize';
import OrganizationNumber from '../App/Filters/OrganizationNumber';
import Phone              from '../App/Filters/Phone';
import ReadableDate       from '../App/Filters/ReadableDate';

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
 * This service registers Vue filters.
 */
export default class Filters extends Service
{
    /**
     * Service name.
     */
    name: string = 'Filters';

    /**
     * State machine store.
     */
    protected store: Store<any>;

    /**
     * Boot the service.
     */
    boot(): void
    {
        let availableFilters = {... SkeletonFilters, ...AppFilters};
        let store = (new StateMachine).getStore();

        for (let key in availableFilters) {
            let filter = (new availableFilters[key](store)).run.bind(this);
            Vue.filter(key, filter);
            Logger.debug('Filter "' + key + '" registered.');
        }
    }
}
