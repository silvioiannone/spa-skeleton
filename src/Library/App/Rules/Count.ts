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
    getMessage(field: string, params: Array<any>, data: any): string
    {
        return `You need to select ${params[0]} ${field}`;
    }

    /**
     * Validate.
     */
    validate(value: string, params: Array<any>): boolean
    {
        return value.length === parseInt(params[0]);
    }
}
