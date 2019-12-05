import { AbstractFilter } from './AbstractFilter';

/**
 * This filter truncates the text at the specified amount of characters.
 */
export class Truncate extends AbstractFilter
{
    /**
     * Run the filter.
     */
    public run(): (value: string, ...args: any[]) => string
    {
        return (value: string, ...args: any[]): string => {
            let length = args[0] || 300;
            let append = args[1] || '...';

            if (value.length < length) {
                return value;
            }

            let sliceEnd = length;

            // If the character at `sliceEnd` position is not a whitespace we keep increasing the
            // `sliceEnd` in order to not cut words in half.
            while (! /\s/.test(value.charAt(sliceEnd))) {
                sliceEnd++;
            }

            return value.slice(0, sliceEnd) + append;
        }
    }
}
