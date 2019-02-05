import AbstractFilter from './AbstractFilter';
import Pluralize      from 'pluralize';

/**
 * This filiter pluralizes the given word.
 */
export default class Plural extends AbstractFilter
{
    /**
     * Run the filter.
     */
    run(value: string, word: string): string
    {
        return parseInt(value) !== 1 ? Pluralize(word) : word;
    }
}
