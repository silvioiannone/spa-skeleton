import Log                 from 'loglevel';
import VeeValidate         from 'vee-validate';
import ValidatorDictionary from 'js/App/Validator/Dictionary';

/**
 * The validator register the needed validators for the vue-validator plugin.
 */
export default class Validator
{
    /**
     * @param Vue Vue instance.
     */
    constructor(Vue)
    {
        this.vue = Vue;
    }

    /**
     * Boot the validator.
     */
    boot()
    {
        Log.debug('Booting validator...');

        VeeValidate.Validator.localize(ValidatorDictionary);
        this.vue.use(VeeValidate);

        Log.debug('Validator ready.');
    }
}
