import AbstractFilter from './AbstractFilter';

/**
 * This filter formats a company organization number.
 */
export default class OrganizationNumber extends AbstractFilter
{
    /**
     * Run the filter.
     *
     * @param value
     * @returns {string}
     */
    run(value)
    {
        if (!value) return '';

        return value.slice(0, 6) + '-' + value.slice(6, value.length);
    }
}
