import { AbstractFilter } from './AbstractFilter';

/**
 * This filter formats a company organization number.
 */
export class OrganizationNumber extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string) => string
    {
        return (value: string): string =>
        {
            if (!value) {
                return '';
            }

            return value.slice(0, 6) + '-' + value.slice(6, value.length);
        }
    }
}
