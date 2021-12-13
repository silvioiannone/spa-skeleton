import { Config }                                from '../../Config';
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate';
import * as VeeValidateRules                     from 'vee-validate/dist/rules';
import Vue                                       from 'vue';
import { Logger as Log }                         from './Logger';
import { Service }                               from './Service';
import { Translator }                            from './Translator';
import AppRules                                  from '@/ts/App/Rules';

// Skeleton rules.
import { Count }      from '../App/Rules/Count';
import { SwedishSsn } from '../App/Rules/SwedishSsn';

const skeletonRules = {
    Count,
    SwedishSsn
};

/**
 * This service provides an input validator.
 */
export class Validator extends Service
{
    /**
     * Service name.
     */
    public name: string = 'Validator';

    /**
     * Boot the validator.
     */
    public static async boot(): Promise<void>
    {
        let messages = await import(`./../../../../bloomestate/node_modules/vee-validate/dist/locale/${Config.locale}.json`);
        let translator = Translator.get();

        Translator.merge(messages.messages, 'validations.vendor');

        configure({
            defaultMessage: (field: string, values: any): any => {
                field = field.toLowerCase();

                // Translate the field.
                values._field_ = translator.t(`validations.names.${field}`);

                // If there's a custom field translation use that one. Custom translations are
                // stored in the locale file under `validation.fields.<field>.<rule>`.
                let customFieldTranslationKey = `validations.fields.${field}.${values._rule_}`;

                if (translator.te(customFieldTranslationKey)) {
                    return translator.t(customFieldTranslationKey, values);
                }

                // If not custom field translation is found, try with a custom rule translation.
                let customRuleTranslationKey = `validations.rules.${values._rule_}`;

                if (translator.te(customRuleTranslationKey)) {
                    return translator.t(customRuleTranslationKey, values);
                }

                // If even the custom field translation cannot be found, use the default translation
                // provided by `vee-validate`.
                return translator.t(`validations.vendor.${values._rule_}`, values);
            }
        });

        for (let key in VeeValidateRules) {
            extend(key, VeeValidateRules[key]);
        }

        let availableRules = { ...skeletonRules, ...AppRules };

        for (let key in availableRules) {
            let rule = new (availableRules[key])(translator);
            let ruleName = key.charAt(0).toLowerCase() + key.slice(1);

            Log.debug(`Registered rule '${ruleName}'.`);

            extend(ruleName, rule.get());
        }

        Vue.component('validation-provider', ValidationProvider);
        Vue.component('validation-observer', ValidationObserver);
    }
}
