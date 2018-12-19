import * as Moment    from 'moment';
import AbstractFilter from './AbstractFilter';

/**
 * This filter formats a date taking into consideration the user's locale value.
 */
export default class Date extends AbstractFilter
{
    /**
     * Run the filter.
     */
    run(value: string): string
    {
        let settings = this.store.getters.app.user.settings;
        let date = Moment(value);

        return Intl.DateTimeFormat(settings.language).format(date.toDate());
    }
}
