import * as Moment        from 'moment';
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
            return Moment.utc(parseInt(value) * 1000).format('HH:mm:ss');
        }
    }
}
