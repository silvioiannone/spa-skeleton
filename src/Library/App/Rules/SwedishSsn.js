import AbstractRule from '../../Validation/AbstractRule';

/**
 * Swedish SSN validation rule.
 *
 * This validation rule can be used in order to validate a Swedish social security number.
 *
 * E.g.:
 *
 *  'swedishSsn'
 */
export default class SwedishSsn extends AbstractRule
{
    /**
     * Get the validation message.
     *
     * @param field
     * @param params
     * @param data
     * @returns {string}
     */
    getMessage(field, params, data)
    {
        return `Invalid SSN.`;
    }

    /**
     * Validate.
     *
     * @param value
     * @param params
     * @returns {boolean}
     */
    validate(value, params)
    {
        if (value.length !== 10) {
            return false;
        }

        let sums = [...value]
            .slice(0, 9)
            .map((char, index) =>
            {
                let factor = index % 2 ? 1 : 2;

                return parseInt(char) * factor;
            });

        // Can't use reduce since the first time the validation is run it will only contain one
        // value and reduce will return it immediately causing the sum to not be processed.
        let total = sums
            .map(number =>
            {
                let partial = number > 10 ? (number % 10) + Math.trunc(number / 10) : number;

                return partial;
            })
            .reduce((total, current) => total + current);

        let totalLastDigit = total % 10;
        let checksum = (10 - totalLastDigit) % 10;

        return parseInt(value.charAt(value.length - 1)) === checksum;
    }
}
