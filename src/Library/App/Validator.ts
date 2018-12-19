import Log         from 'loglevel';
import VeeValidate from 'vee-validate';
import Vue         from 'vue';
import Translator  from './Translator';

// Skeleton rules.
import Count      from './Rules/Count';
import SwedishSsn from './Rules/SwedishSsn';

const skeletonRules = {
    Count,
    SwedishSsn
}

/**
 * The validator register the needed validators for the vue-validator plugin.
 */
export default class Validator
{
    /**
     * Translator.
     */
    protected translator: Translator;

    /**
     * Constructor.
     */
    constructor(translator: Translator)
    {
        this.translator = translator;
    }

    /**
     * Boot the validator.
     */
    boot()
    {
        Log.debug('Booting validator...');

        Vue.use(VeeValidate);

        for (let key in skeletonRules) {
            let rule = new (skeletonRules[key])(this.translator.get());
            let ruleName = key.charAt(0).toLowerCase() + key.slice(1);

            Log.debug(`Registered rule '${ruleName}'.`);

            VeeValidate.Validator.extend(ruleName, rule.get())
        }

        Log.debug('Validator ready.');
    }
}
