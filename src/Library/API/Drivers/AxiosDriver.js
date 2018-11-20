import Axios             from 'axios';
import Config            from '../../../Config';
import AbstractApiDriver from './AbstractApiDriver';

/**
 * API driver that makes use of Axios.
 */
export default class AxiosDriver extends AbstractApiDriver
{
    /**
     * Constructor.
     */
    constructor()
    {
        super();

        this.http = Axios.create({
            url: Config.api.basePath,
        });

        this.http.interceptors.request.use(config => this.interceptRequest(config));
        this.http.interceptors.response.use(response => this.interceptResponse(response));
    }

    /**
     * Intercept a response.
     *
     * @param response
     */
    interceptResponse(response)
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
    async interceptRequest(config)
    {
        return new Promise(async (resolve, reject) =>
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
     *
     * @return {Promise}
     */
    async refreshToken()
    {
        let response;

        try {
            response = await this.http.post('/oauth/token', {
                grant_type: 'refresh_token',
                refresh_token: self.token.getRefreshToken(),
                client_id: Config.client.id,
                client_secret: Config.client.secret,
                scope: ''
            });
        } catch (error) {
            this.token.remove();
            throw new error;
        }

        this.token.save(response.data.access_token, response.data.refresh_token);
        resolve(response);
    }

    /**
     * Set the headers.
     *
     * @param config
     * @returns {*}
     */
    setHeaders(config)
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

    _download(action)
    {
        return undefined;
    }

    /**
     * Send a DELETE HTTP request to the API.
     *
     * @param action
     * @param data
     * @returns {Promise}
     */
    async sendDelete(action, data)
    {
        return this.http.delete(this.getAction(action), data);
    }

    /**
     * Send a GET HTTP request to the API.
     *
     * @param action
     * @returns {Promise}
     * @protected
     */
    async sendGet(action)
    {
        return this.http.get(
            this.getAction(action),
            {
                params: this.parameters
            }
        );
    }

    /**
     * Sebd a PATCH HTTP request to the API.
     *
     * @param action
     * @param data
     * @returns {Promise}
     */
    async sendPatch(action, data)
    {
        return this.http.patch(this.getAction(action), data);
    }

    /**
     * Send a POST HTTP request to the API.
     *
     * @param action
     * @param data
     * @returns {Promise}
     * @protected
     */
    async sendPost(action, data)
    {
        return this.http.post(this.getAction(action), data);
    }

    /**
     * Parse and normalize the response.
     *
     * @param response
     */
    parseResponse(response)
    {
        return {
            body: response.data
        }
    }
}
