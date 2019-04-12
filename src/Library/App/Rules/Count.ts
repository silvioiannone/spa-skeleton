import AbstractRule from '../../Validation/AbstractRule';

/**
 * Count validation rule.
 *
 * This validation rule can be used in order to see that the number of items matches the given
 * count.
 *
 * E.g.:
 *
 *  'count:3'
 */
export default class Count extends AbstractRule
{
    /**
     * Get the validation message.
     */
    public getMessage(field: string, params: any[]): string
    {
        return `You need to select ${params[0]} ${field}`;
    }

    /**
     * Validate.
     */
    public validate(value: string, params: any[]): boolean
    {
        return value.length === parseInt(params[0]);
    }
}
