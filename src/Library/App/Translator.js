import _       from 'lodash';
import Log     from 'loglevel';
import VueI18N from 'vue-i18n';
import Config  from '../../Config';

/**
 * Add multiple language support to the app.
 */
export default class Translator
{
    /**
     * Boot the translator.
     *
     * @returns {Translator}
     */
    boot()
    {
        Log.debug('Loading language...');

        let locale = Config.locale;
        let appLocale = require('locales/' + locale + '.json');
        let skeletonLocale = require('./../../Assets/Locales/' + locale + '.json');

        let messages = {};

        messages[locale] = _.merge(skeletonLocale, appLocale);

        Log.debug('Language loaded.');

        return new VueI18N({
            locale,
            messages
        });
    }
}
