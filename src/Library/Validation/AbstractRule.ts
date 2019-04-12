import VueI18N from 'vue-i18n';

interface Rule {
    getMessage: (field: string, params: any[], data: any) => string;
    validate: (value: string, params: any[]) => boolean;
}

/**
 * An abstract validation rule.
 */
export default abstract class AbstractRule
{
    /**
     * Translator.
     */
    protected translator: VueI18N;

    /**
     * Constructor.
     */
    public constructor(translator: VueI18N)
    {
        this.translator = translator;
    }

    /**
     * Get the rule.
     */
    public get(): Rule
    {
        return {
            getMessage: this.getMessage,
            validate: this.validate
        }
    }

    /**
     * Get the validation message.
     */
    abstract getMessage(field: string, params: any[], data: any): string

    /**
     * Validate.
     */
    abstract validate(value: string, params: any[]): boolean
}
