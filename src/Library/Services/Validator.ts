import VeeValidate from 'vee-validate';
import Vue         from 'vue';
import Log         from './Logger';
import Service     from './Service';
import Translator  from './Translator';
import AppRules    from '../../../../../resources/ts/App/Rules';

// Skeleton rules.
import Count      from '../App/Rules/Count';
import SwedishSsn from '../App/Rules/SwedishSsn';

const skeletonRules = {
    Count,
    SwedishSsn
};

/**
 * This service provides an input validator.
 */
export default class Validator extends Service
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
        let translator = (new Translator).get();

        Vue.use(VeeValidate, {
            i18nRootKey: 'validations',
            i18n: translator,
        });

        let availableRules = { ...skeletonRules, ...AppRules };

        for (let key in availableRules) {
            let rule = new (availableRules[key])(translator);
            let ruleName = key.charAt(0).toLowerCase() + key.slice(1);

            Log.debug(`Registered rule '${ruleName}'.`);

            VeeValidate.Validator.extend(ruleName, rule.get())
        }
    }
}
