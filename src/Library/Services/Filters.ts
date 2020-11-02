import Vue              from 'vue';
import { Logger }       from './Logger';
import { Service }      from './Service';
import { StateMachine } from './StateMachine';
import AppFilters       from '../../../../../resources/ts/App/Filters';

// Skeleton filters
import { Capitalize }         from '../App/Filters/Capitalize';
import { Currency }           from '../App/Filters/Currency';
import { Date }               from '../App/Filters/Date';
import { Duration }           from '../App/Filters/Duration';
import { FileSize }           from '../App/Filters/FileSize';
import { OrganizationNumber } from '../App/Filters/OrganizationNumber';
import { Phone }              from '../App/Filters/Phone';
import { Plural }             from '../App/Filters/Plural';
import { ReadableDate }       from '../App/Filters/ReadableDate';
import { Truncate }           from '../App/Filters/Truncate';
import { ZipCode }            from '../App/Filters/ZipCode';

const SkeletonFilters = {
    capitalize: Capitalize,
    currency: Currency,
    date: Date,
    duration: Duration,
    fileSize: FileSize,
    organizationNumber: OrganizationNumber,
    phone: Phone,
    plural: Plural,
    readableDate: ReadableDate,
    truncate: Truncate,
    zipCode: ZipCode
};

/**
 * This service registers Vue filters.
 */
export class Filters extends Service
{
    /**
     * Service name.
     */
    public name: string = 'Filters';

    /**
     * Boot the service.
     */
    public static boot(): void
    {
        let availableFilters = {... SkeletonFilters, ...AppFilters};
        let store = StateMachine.getStore();

        for (let key in availableFilters) {
            let filter = new availableFilters[key](store);
            Vue.filter(key, filter.run());
            Logger.debug('Filter "' + key + '" registered.');
        }
    }
}
