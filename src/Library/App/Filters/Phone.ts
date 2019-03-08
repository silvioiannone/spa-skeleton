import AbstractFilter from './AbstractFilter';

/**
 * This filter formats a phone number.
 */
export default class Phone extends AbstractFilter
{
    /**
     * Run the filter.
     */
    run(): (value: string) => string
    {
        return (value: string) =>
        {
            if (! value) {
                return '';
            }

            return value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8) +  ' '
                + value.slice(8, value.length);
        }
    }
}
