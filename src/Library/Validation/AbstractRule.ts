import VueI18N from 'vue-i18n';

/**
 * An abstract validation rule.
 */
export default abstract class AbstractRule
{
    /**
     * Translator.
     */
    translator: VueI18N;

    /**
     * Constructor.
     */
    constructor(translator: VueI18N)
    {
        this.translator = translator;
    }

    /**
     * Get the rule.
     */
    get() {
        return {
            getMessage: this.getMessage,
            validate: this.validate
        }
    }

    /**
     * Get the validation message.
     */
    abstract getMessage(field: string, params: Array<any>, data: any): string

    /**
     * Validate.
     */
    abstract validate(value: string, params: Array<any>): boolean
}
