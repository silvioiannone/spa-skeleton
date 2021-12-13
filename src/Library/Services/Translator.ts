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
    public static async boot(): Promise<void>
    {
        Log.debug('Loading language...');

        let locale = Config.locale;

        Translator.instance = new VueI18N({
            locale,
            fallbackLocale: 'en',
            messages: {},
            silentTranslationWarn: Config.app.services.translator.hideWarnings
        });

        // TODO: replace import path when not using this package (spa-skeleton) as a linked
        // dependency. Replace the one in the Validator service too.
        let appLocale = await import(`../../../../bloomestate/resources/locales/${locale}.json`);
        let skeletonLocale = await import(`../../../../bloomestate/node_modules/spa-skeleton/src/Assets/Locales/${locale}.json`);

        Translator.merge(skeletonLocale, '', locale);
        Translator.merge(appLocale, '', locale);
        Translator.merge(VuetifyLocale[locale], '$vuetify', locale);

        Log.debug(`Locale set to "${locale}".`);
        Log.debug('Language loaded.');
    }
}
