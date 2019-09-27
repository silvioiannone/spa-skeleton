import { Config }                                from '../../Config';
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate';
import * as VeeValidateRules                     from 'vee-validate/dist/rules';
import Vue                                       from 'vue';
import { Logger as Log }                         from './Logger';
import { Service }                               from './Service';
import { Translator }                            from './Translator';
import AppRules                                  from '../../../../../resources/ts/App/Rules';

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
    public boot(): void
    {

        let messages = require(`../../../../vee-validate/dist/locale/${Config.locale}.json`); // eslint-disable-line @typescript-eslint/no-var-requires
        let translator = (new Translator).get();

        configure({
            defaultMessage: (_, values: any): any =>
                translator.t(`validations.${values._rule_}`, values)
        });

        for (let key in VeeValidateRules) {
            extend(key, {
                ...VeeValidateRules[key],
                message: messages.messages[key]
            });
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
