import * as Moment        from 'moment';
import { AbstractFilter } from './AbstractFilter';

/**
 * This filter formats a date taking into consideration the user's locale value.
 */
export class Date extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string) => string
    {
        return (value: string): string =>
        {
            let settings = this.store.getters.app.user.settings;
            let date = Moment(value);

            return Intl.DateTimeFormat(settings.language).format(date.toDate());
        }
    }
}
