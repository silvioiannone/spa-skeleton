import Axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';
import { AbstractApiDriver } from './AbstractApiDriver';
import { Config }            from '../../../Config';
import { ResponseInterface } from '../ResponseInterface';

/**
 * API driver that makes use of Axios.
 */
export class AxiosDriver extends AbstractApiDriver
{
    /**
     * Axios HTTP client.
     */
    protected http: AxiosInstance;

    /**
     * Constructor.
     */
    public constructor()
    {
        super();

        this.http = Axios.create({
            url: Config.api.basePath,
        });

        this.http.interceptors.request.use((config): Promise<AxiosRequestConfig> =>
            this.interceptRequest(config)
        );
        this.http.interceptors.response.use((response): AxiosResponse =>
            this.interceptResponse(response)
        );
    }

    /**
     * Intercept a response.
     */
    public interceptResponse(response: AxiosResponse): AxiosResponse
    {
        if (response.data.access_token) {
            this.token.save(response.data.access_token, response.data.refresh_token);
        }

        return response;
    }

    /**
     * Intercept a request.
     *
     * @param config
     */
    public async interceptRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig>
    {
        return new Promise(async (resolve, reject): Promise<void> =>
        {
            // Do not intercept the authentication request.
            if (config.url === '/oauth/token') {
                config.headers.Accept = 'application/json';
                resolve(config);
                return;
            }

            this.setHeaders(config);

            if (this.token.getAccessToken() && this.token.isExpired()) {
                try {
                    await this.refreshToken();
                } catch (error) {
                    reject(error);
                }

                this.setHeaders(config);
            }

            resolve(config);
        });
    }

    /**
     * Refresh the current API token.
     */
    public async refreshToken(): Promise<any>
    {
        let response;

        try {
            response = await this.http.post('/oauth/token', {
                grant_type: 'refresh_token',
                refresh_token: this.token.getRefreshToken(),
                client_id: Config.client.id,
                client_secret: Config.client.secret,
                scope: ''
            });
        } catch (error) {
            this.token.remove();
            throw new error;
        }

        this.token.save(response.data.access_token, response.data.refresh_token);
    }

    /**
     * Set the headers.
     *
     * @param config
     * @returns {*}
     */
    public setHeaders(config: AxiosRequestConfig): AxiosRequestConfig
    {
        config.headers.Accept = 'application/json';

        if (this.token.getAccessToken()) {
            config.headers.Authorization = 'Bearer ' + this.token.getAccessToken();
        }

        if (this.socketId) {
            config.headers['X-Socket-ID'] = this.socketId;
        }

        return config;
    }

    protected async _download(): Promise<any>
    {
        return undefined;
    }

    /**
     * Send a DELETE HTTP request to the API.
     */
    protected async sendDelete(action: string, data: any): Promise<any>
    {
        return this.http.delete(this.getAction(action), data);
    }

    /**
     * Send a GET HTTP request to the API.
     */
    protected async sendGet(action: string): Promise<any>
    {
        return this.http.get(
            this.getAction(action),
            {
                params: this.parameters
            }
        );
    }

    /**
     * Send a PATCH HTTP request to the API.
     */
    protected async sendPatch(action: string, data: any): Promise<any>
    {
        return this.http.patch(this.getAction(action), data);
    }

    /**
     * Send a POST HTTP request to the API.
     */
    public async sendPost(action: string, data: any): Promise<any>
    {
        return this.http.post(this.getAction(action), data);
    }

    /**
     * Parse and normalize the response.
     *
     * @param response
     */
    public parseResponse(response: AxiosResponse): ResponseInterface
    {
        return {
            body: response.data,
            headers: response.headers,
            status: response.status,
            request: {
                url: response.request.url
            },
            text: response.data
        }
    }
}
