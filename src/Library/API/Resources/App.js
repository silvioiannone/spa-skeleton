import AbstractResource from './AbstractResource';

/**
 * App resource.
 */
export default class App extends AbstractResource
{
    constructor()
    {
        super();

        this.resourceName = 'app';
    }

    /**
     * Get a locale.
     *
     * @param locale
     * @param successCallback
     * @param errorCallback
     */
    getLocale(locale, successCallback, errorCallback)
    {
        return new Promise((resolve, reject) =>
        {
            this.httpClient
                .get('/locales/' + locale + '.json')
                .end(function (error, response)
                {
                    if (error)
                    {
                        reject(response);
                        return;
                    }

                    resolve(response);
                });
        });
    }

    /**
     * Get the application settings.
     *
     * @returns {Promise}
     */
    getSettings()
    {
        return this._get('settings');
    }

    /**
     * Save the application settings.
     *
     * @param settings
     * @returns {Promise}
     */
    saveSettings(settings)
    {
        return this._patch('settings', settings);
    }
}
