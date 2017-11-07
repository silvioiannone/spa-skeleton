import Moment from 'moment';

/**
 * String utilities.
 */
export default
{
    /**
     * Limit a string to the specified number of words.
     *
     * @param {String} string
     * @param {Number} [wordsCount]
     * @return {*}
     */
    limit(string, wordsCount)
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
     *
     * @param {String} string
     * @param {String} format http://momentjs.com/docs/#/displaying/format/
     * @return {*}
     */
    time(string, format)
    {
        format = format || 'lll';

        return Moment(string).format(format);
    }
}