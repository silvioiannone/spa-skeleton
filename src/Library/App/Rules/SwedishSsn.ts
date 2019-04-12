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
     */
    public getMessage(): string
    {
        return `Invalid SSN.`;
    }

    /**
     * Validate.
     */
    public validate(value: string): boolean
    {
        // Remove the dash.
        value = value.replace('-', '');

        if (value.length !== 10) {
            return false;
        }

        let sums = [...Array.from(value)]
            .slice(0, 9)
            .map((char, index): number =>
            {
                let factor = index % 2 ? 1 : 2;

                return parseInt(char) * factor;
            });

        // Can't use reduce since the first time the validation is run it will only contain one
        // value and reduce will return it immediately causing the sum to not be processed.
        let total = sums
            .map((number): number => number >= 10 ? (number % 10) + Math.trunc(number / 10) : number)
            .reduce((total, current): number => total + current);

        let totalLastDigit = total % 10;
        let checksum = (10 - totalLastDigit) % 10;

        return parseInt(value.charAt(value.length - 1)) === checksum;
    }
}
