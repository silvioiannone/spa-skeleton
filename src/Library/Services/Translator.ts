import { Logger as Log }  from "./Logger";
import _                  from "lodash";
import VueI18N            from 'vue-i18n';
import { Service }        from './Service';
import { Config }         from "../../Config";
import * as VuetifyLocale from 'vuetify/src/locale';

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
    public static get(): VueI18N
    {
        return Translator.instance;
    }

    /**
     * Merge the given messages with the already existing ones.
     */
    public static merge(messages: any, key: string, locale: string = Config.locale): void
    {
        let messagesToMerge = key.length ? _.set({}, key, messages) : messages;

        Translator.get().mergeLocaleMessage(locale, messagesToMerge);
    }

    /**
     * Boot the translator.
     */
    public static boot(): typeof Translator
    {
        Log.debug('Loading language...');

        let locale = Config.locale;
        let appLocale = require('./../../../../../resources/locales/' + locale + '.json'); // eslint-disable-line @typescript-eslint/no-var-requires
        let skeletonLocale = require('./../../Assets/Locales/' + locale + '.json'); // eslint-disable-line @typescript-eslint/no-var-requires

        let messages = {};

        messages[locale] = _.merge(
            skeletonLocale,
            appLocale,
            { $vuetify: VuetifyLocale[locale] }
        );

        Log.debug(`Locale set to "${locale}".`);
        Log.debug('Language loaded.');

        Translator.instance = new VueI18N({
            locale,
            fallbackLocale: 'en',
            messages,
            silentTranslationWarn: Config.app.services.translator.hideWarnings
        });

        return Translator;
    }
}
