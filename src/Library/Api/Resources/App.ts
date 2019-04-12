import ApiResource  from './ApiResource';
import ResponseInterface from '../ResponseInterface';

/**
 * App resource.
 */
export default class App extends ApiResource
{
    public constructor()
    {
        super();

        this.resourceName = 'app';
    }

    /**
     * Get a locale.
     */
    public getLocale(locale: string): Promise<ResponseInterface>
    {
        return new Promise((resolve, reject): void =>
        {
            this.httpClient
                .get('/locales/' + locale + '.json')
                .end((error: any, response: any): void =>
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
    public getSettings(): Promise<ResponseInterface>
    {
        return this._get('settings');
    }

    /**
     * Save the application settings.
     */
    public saveSettings(settings: any): Promise<ResponseInterface>
    {
        return this._patch('settings', settings);
    }
}
