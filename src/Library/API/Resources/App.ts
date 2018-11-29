import AbstractResource  from './AbstractResource';
import ResponseInterface from '../ResponseInterface';

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
    getLocale(locale: string, successCallback: Function, errorCallback: Function)
        : Promise<ResponseInterface>
    {
        return new Promise((resolve, reject) =>
        {
            this.httpClient
                .get('/locales/' + locale + '.json')
                .end(function (error: any, response: any)
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
     */
    getSettings(): Promise<ResponseInterface>
    {
        return this._get('settings');
    }

    /**
     * Save the application settings.
     */
    saveSettings(settings: any): Promise<ResponseInterface>
    {
        return this._patch('settings', settings);
    }
}
