import { capitalize } from 'lodash';
import DayJS from 'dayjs';

/**
 * String utilities.
 */
export class String
{
    /**
     * Capitalize a string.
     */
    public static capitalize(string: string): string
    {
        return capitalize(string);
    }

    /**
     * Limit a string to the specified number of words.
     */
    public static limit(string: string, wordsCount: number): string
    {
        wordsCount = wordsCount || 25;

        let result = string.match(/(\S+\s?)/gm);

        if(!result) return string;

        if(result.length > wordsCount)
        {
            result.splice(wordsCount);
        }

        return result.join('') + '...';
    }

    /**
     * Transforms the time string into a human readable format.
     */
    public static time(string: string, format: string): string
    {
        format = format || 'lll';

        return DayJS(string).format(format);
    }

    /**
     * Return the parent path of the given path.
     */
    public static parentPath(path: string, levels = 1): string
    {
        let parent = path.split('/');
        return '/' + parent.splice(1, parent.length - levels - 1).join('/');
    }
}
