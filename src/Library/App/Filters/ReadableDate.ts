import DayJS from 'dayjs';
import { AbstractFilter } from './AbstractFilter';
import { Config } from '../../../Config';

/**
 * This filter formats a date taking into consideration the user's locale value.
 */
export class ReadableDate extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string) => string
    {
        return (value: string): string => {
            let language = this.store.getters.app.user.settings.language;

            DayJS.locale(language);

            return DayJS(value).format(Config.app.system.dateAndTime.dateFormat);
        }
    }
}
