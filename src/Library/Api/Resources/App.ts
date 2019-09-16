import { ApiResource }       from './ApiResource';
import { ResponseInterface } from '../ResponseInterface';
import { Token }             from 'spa-skeleton/src/Library/Api/Token';

/**
 * App resource.
 */
export class App extends ApiResource
{
    public resourceName: string = 'app';

    /**
     * Get a locale.
     */
    public getLocale(locale: string): Promise<ResponseInterface>
    {
        return this.httpClient.get('/locales/' + locale + '.json');
    }

    /**
     * Get the application settings.
     */
    public getSettings(): Promise<ResponseInterface>
    {
        // Delete the old token in order to avoid issues since the authentication endpoint doesn't
        // expect it.
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
