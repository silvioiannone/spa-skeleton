import Log     from "./Logger";
import _       from "lodash";
import VueI18N from 'vue-i18n';
import Service from './Service';
import Config from "../../Config";

/**
 * This service provides translations.
 */
export default class Translator extends Service
{
    /**
     * Service name.
     */
    name: string = 'Translator';

    /**
     * Translator instance.
     */
    protected static instance: VueI18N;

    /**
     * Get the translator instance.
     */
    get(): VueI18N
    {
        return Translator.instance;
    }

    /**
     * Boot the translator.
     */
    boot(): Translator
    {
        Log.debug('Loading language...');

        let locale = Config.locale;
        let appLocale = require('locales/' + locale + '.json');
        let skeletonLocale = require('./../../Assets/Locales/' + locale + '.json');

        let messages = {};

        messages[locale] = _.merge(skeletonLocale, appLocale);

        Log.debug('Language loaded.');

        Translator.instance = new VueI18N({
            locale,
            fallbackLocale: 'en',
            messages,
            silentTranslationWarn: Config.app.services.translator.hideWarnings
        });

        return this;
    }
}
