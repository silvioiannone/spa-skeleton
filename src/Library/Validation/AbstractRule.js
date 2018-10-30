/**
 * An abstract validation rule.
 */
export default class AbstractRule
{
    /**
     * Constructor.
     *
     * @param translator
     */
    constructor(translator)
    {
        this.vue = translator;
    }

    /**
     * Get the rule.
     *
     * @abstract
     */
    get() {
        return {
            getMessage: this.getMessage,
            validate: this.validate
        }
    }

    /**
     * Get the validation message.
     *
     * @abstract
     * @param field
     * @param params
     * @param data
     * @returns {string}
     */
    getMessage(field, params, data) {}

    /**
     * Validate.
     *
     * @abstract
     * @param value
     * @param params
     * @returns {boolean}
     */
    validate(value, params) {}
}
