import Log         from 'loglevel';
import VeeValidate from 'vee-validate';
import Vue         from 'vue';
import Service     from './Service';
import Translator  from './Translator';

// Skeleton rules.
import Count      from '../App/Rules/Count';
import SwedishSsn from '../App/Rules/SwedishSsn';

const skeletonRules = {
    Count,
    SwedishSsn
}

/**
 * This service provides an input validator.
 */
export default class Validator extends Service
{
    /**
     * Service name.
     */
    name: string = 'Validator';

    /**
     * Boot the validator.
     */
    boot(): void
    {
        let translator = (new Translator).get();

        Vue.use(VeeValidate);

        for (let key in skeletonRules) {
            let rule = new (skeletonRules[key])(translator);
            let ruleName = key.charAt(0).toLowerCase() + key.slice(1);

            Log.debug(`Registered rule '${ruleName}'.`);

            VeeValidate.Validator.extend(ruleName, rule.get())
        }
    }
}
