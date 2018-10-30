import Log                 from 'loglevel';
import VeeValidate         from 'vee-validate';
import ValidatorDictionary from 'js/App/Validator/Dictionary';

// Skeleton rules.
import Count from './Rules/Count';

const skeletonRules = {
    Count
}

/**
 * The validator register the needed validators for the vue-validator plugin.
 */
export default class Validator
{
    /**
     * @param Vue Vue instance.
     */
    constructor(Vue, translator)
    {
        this.vue = Vue;
        this.translator = translator;
    }

    /**
     * Boot the validator.
     */
    boot()
    {
        Log.debug('Booting validator...');

        VeeValidate.Validator.localize(ValidatorDictionary);
        this.vue.use(VeeValidate);

        for (let key in skeletonRules) {
            let rule = new (skeletonRules[key])(this.translator);
            let ruleName = key.charAt(0).toLowerCase() + key.slice(1);

            Log.debug(`Registered rule '${ruleName}'.`);

            VeeValidate.Validator.extend(ruleName, rule.get())
        }

        Log.debug('Validator ready.');
    }
}
