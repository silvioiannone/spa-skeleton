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
     *
     * @param field
     * @param params
     * @param data
     * @returns {string}
     */
    getMessage(field, params, data)
    {
        return `You need to select ${params[0]} ${field}`;
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
        return value.length === parseInt(params[0]);
    }
}
