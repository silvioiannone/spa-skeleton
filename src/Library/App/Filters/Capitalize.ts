import AbstractFilter from './AbstractFilter';

/**
 * This filter capitalizes the given string.
 */
export default class Capitalize extends AbstractFilter
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

            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
}
