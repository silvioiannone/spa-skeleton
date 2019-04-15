import Moment from 'moment';

/**
 * String utilities.
 */
let String = {
    /**
     * Limit a string to the specified number of words.
     */
    limit(string: string, wordsCount: number): string
    {
        wordsCount = wordsCount || 25;

        let result = string.match(/(\S+\s?)/gm);

        if(!result) return string;

        if(result.length > wordsCount)
        {
            result.splice(wordsCount);
        }

        return result.join('') + '...';
    },

    /**
     * Transforms the time string into a human readable format.
     */
    time(string: string, format: string): string
    {
        format = format || 'lll';

        return Moment(string).format(format);
    },

    /**
     * Return the parent path of the given path.
     */
    parentPath(path: string, levels = 1): string
    {
        let parent = path.split('/');
        return '/' + parent.splice(1, parent.length - levels - 1).join('/');
    }
}

export { String };
