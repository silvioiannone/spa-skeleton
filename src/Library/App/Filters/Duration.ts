import DayJS from 'dayjs';
import { AbstractFilter } from './AbstractFilter';

/**
 * Display an amount of time as a duration.
 */
export class Duration extends AbstractFilter
{
    public run(): (value: string) => string
    {
        return (value: string): string =>
        {
            let duration = DayJS.duration(parseInt(value) * 1000);

            return DayJS(duration.asMilliseconds()).utc().format('HH:mm:ss')
        }
    }
}
