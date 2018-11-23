import AbstractFilter from './AbstractFilter';

/**
 * This filter capitalizes the given string.
 *
 * @param {string} value
 */
export default class Capitalize extends AbstractFilter
{
    /**
     * Run the filter.
     *
     * @param value
     * @returns {string}
     */
    run(value)
    {
        if (!value) {
            return '';
        }

        return value.charAt(0).toUpperCase() + value.slice(1)
    }
}
