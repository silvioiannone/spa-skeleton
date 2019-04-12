import AbstractFilter from './AbstractFilter';
import Pluralize      from 'pluralize';

/**
 * This filter pluralizes the given word.
 */
export default class Plural extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string, word: string) => string
    {
        return (value: string, word: string): string =>
        {
            return parseInt(value) !== 1 ? Pluralize(word) : word;
        }
    }
}
