import * as Moment    from 'moment';
import AsbtractFilter from './AbstractFilter';

/**
 * Display an amount of time as a duration.
 */
export default class Duration extends AsbtractFilter
{
    run(): (value: string) => string
    {
        return (value: string) =>
        {
            return Moment.utc(parseInt(value) * 1000).format('HH:mm:ss');
        }
    }
}
