import { Logger as Log } from "./Logger";
import _                 from "lodash";
import VueI18N           from 'vue-i18n';
import { Service }       from './Service';
import { Config }        from "../../Config";

/**
 * This service provides translations.
 */
export class Translator extends Service
{
    /**
     * Service name.
     */
    public name: string = 'Translator';

    /**
     * Translator instance.
     */
    protected static instance: VueI18N;

    /**
     * Get the translator instance.
     */
    public get(): VueI18N
    {
        return Translator.instance;
    }

    /**
     * Merge the given messages with the already existing ones.
     */
    public merge(messages: any, key: string, locale: string = Config.locale): void
    {
        let messagesToMerge = _.set({}, key, messages);

        Translator.instance.mergeLocaleMessage(locale, messagesToMerge);
    }

    /**
     * Boot the translator.
     */
    public static boot(): typeof Translator
    {
        Log.debug('Loading language...');

        let locale = Config.locale;
        let appLocale = require('locales/' + locale + '.json'); // eslint-disable-line @typescript-eslint/no-var-requires
        let skeletonLocale = require('./../../Assets/Locales/' + locale + '.json'); // eslint-disable-line @typescript-eslint/no-var-requires

        let messages = {};

        messages[locale] = _.merge(skeletonLocale, appLocale);

        Log.debug(`Locale set to "${locale}".`);
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
