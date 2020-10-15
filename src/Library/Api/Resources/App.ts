import { ApiResource }       from './ApiResource';
import { ResponseInterface } from '../ResponseInterface';

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
        return this._get('settings');
    }

    /**
     * Update an application setting.
     */
    public updateSetting(key: string, value: any): Promise<ResponseInterface>
    {
        return this._patch('settings', {
            key,
            value: JSON.stringify(value)
        });
    }

    /**
     * Decode an hashed ID.
     */
    public decodeHashid(hashid: string, resource: string): Promise<ResponseInterface>
    {
        return this._get(`hashids/decode?hashid=${hashid}&resource=${resource}`);
    }
}
