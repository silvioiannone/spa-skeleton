import { AbstractFilter } from './AbstractFilter';

/**
 * This filter formats a ZIP code.
 */
export class ZipCode extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string) => string
    {
        return (value: string): string =>
        {
            if (! value) {
                return '';
            }

            return value.slice(0, 3) + ' ' + value.slice(3, 5);
        }
    }
}
