import AbstractFilter from './AbstractFilter';

/**
 * This filter formats the given file size (in bytes) into a nice string.
 */
export default class FileSize extends AbstractFilter
{
    /**
     * Run the filter.
     *
     * @param value
     * @returns {string}
     */
    run(value)
    {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const unitsCount = 1024;

        let step = 0;

        while (value >= unitsCount) {
            value /= unitsCount;
            step++;
        }

        return value.toFixed(1) + ' ' + units[step];
    }
}
