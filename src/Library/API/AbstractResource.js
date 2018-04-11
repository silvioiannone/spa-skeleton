import Config     from '../../Config';
import httpClient from 'superagent';
import Token      from './Token';
import URLPattern from 'url-pattern';
import Echo from 'laravel-echo';

/**
 * Paths that should be ignored.
 *
 * Requests saved here will not be intercepted and treated as a regular API request.
 *
 * @type {*[]}
 */
let ignoredPaths = [
    {
        method: 'GET',
        action: '/users/activation(/:activationId)'
    },
    // Ignore the refresh token
    {
        method: 'GET',
        action: '/users/token'
    },
    {
        method: 'POST',
        action: '/users/activate'
    },
    {
        method: 'POST',
        action: '/users/resetPassword'
    },
    // Ignore the login
    {
        method: 'POST',
        action: '/oauth/token'
    },
    // Ignore the signup
    {
        method: 'POST',
        action: '/users'
    },
];

/**
 * Represents an abstract API resouce.
 *
 * @abstract
 */
export default class AbstractResource
{
    constructor()
    {
        this.attachments = [];
        this.token = new Token;
        this.httpClient = httpClient;
        this.parameters = {};
        this.resourceName = '';
        this.socketId = '';
    }

    /**
     * Set the socket ID that will be send with the headers.
     *
     * @param socketId
     */
    setSocketId(socketId)
    {
        this.socketId = socketId;
    }

    /**
     * Set the parameters to be sent with the request.
     *
     * @param parameters
     * @return {AbstractResource}
     */
    setParameters(parameters)
    {
        this.parameters = parameters;

        return this;
    }

    /**
     * Send a GET HTTP request to the API.
     *
     * @param {string} action
     * @return {Promise}
     * @protected
     */
    _get(action)
    {
        let actionURI = this.getAction(action);

        if(Object.keys(this.parameters).length !== 0)
        {
            actionURI += '?' + this.getURIEncodedParameters();
        }

        let request = httpClient.get(actionURI);

        return this.dispatchRequest(request);
    }

    /**
     * Send a DELETE HTTP request to the API.
     *
     * @param {string} action The action that should be added at the end of the path.
     *        E.g.: 'signup' method => 'https://example.com/user/signup'.
     * @param {Object} data POST data.
     * @return {Promise}
     * @protected
     */
    _delete(action, data)
    {
        let request = httpClient
            .delete(this.getAction(action))
            .send(data);

        return this.dispatchRequest(request);
    }

    /**
     * Send a PATCH HTTP request to the API.
     *
     * @param {string} action The action that should be added at the end of the
     *        path. E.g.: 'signup' method => 'https://example.com/user/signup'.
     * @param {Object} data POST data.
     * @return {Promise}
     * @protected
     */
    _patch(action, data)
    {
        let request = httpClient
            .patch(this.getAction(action))
            .send(data);

        return this.dispatchRequest(request);
    }

    /**
     * Send a POST HTTP request to the API.
     *
     * @param {string} action The action that should be added at the end of the path.
     *        E.g.: 'signup' method => 'https://example.com/user/signup'.
     * @param {Object} [data] POST data.
     * @return Promise
     * @protected
     */
    _post(action, data)
    {
        let request = httpClient
            .post(this.getAction(action));

        this.attachments.forEach(attachment =>
        {
            request.attach(attachment.name, attachment.file);
        });

        if (this.attachments.length) {
            return this.dispatchRequest(request);
        }

        request.send(data);

        return this.dispatchRequest(request);
    }

    /**
     * Attach a file to the request. This will only work with a POST request.
     *
     * @param {string} name
     * @param {File} file
     */
    attach(name, file)
    {
        this.attachments.push({
            name, file
        });

        return this;
    }

    /**
     * Dispatch the request to the server.
     *
     * @param {Request} request
     * @return {Promise}
     */
    dispatchRequest(request)
    {
        let self = this;

        return new Promise((resolve, reject) =>
        {
            self.interceptRequest(request)
                .then(resolved =>
                {
                    let request = resolved.request;

                    request.end(function(error, response)
                    {
                        if (error)
                        {
                            reject(response);
                            return;
                        }

                        self.interceptResponse(response)
                            .then(() =>
                            {
                                resolve(response);
                            });
                    });
                })
                .catch(error => reject(error));

            // Clean the parameters
            this.parameters = {};

            // Clean the attachments
            this.attachments = [];
        });
    }

    /**
     * Intercept the request, make changes to it and return it.
     *
     * @param {Object} request
     * @returns {Promise}
     */
    interceptRequest(request)
    {
        let self = this;

        return new Promise((resolve, reject) =>
        {
            // Check if the request shouldn't be intercepted (example: it's the authentication
            // request)
            if (request.url === '/oauth/token')
            {
                resolve({request});
                return;
            }

            request = this.setHeaders(request);

            if(self.skipIgnoredRequests(request))
            {
                // We need to wrap 'currentRequest' otherwise it will be sent to the server and we
                // haven't finished yet.
                resolve({request});
                return;
            }

            // Before making any request, we need to check that the token is not expired.
            if(self.token.getAccessToken() && self.token.isExpired())
            {
                this.refreshToken()
                    .then(() => resolve({request}))
                    .catch(error => reject(error));

                request.set('Authorization', 'Bearer ' + self.token.getAccessToken());
                return;
            }

            resolve({request});
        });
    }

    /**
     * Refresh the current API token.
     */
    refreshToken()
    {
        let self = this;

        return new Promise((resolve, reject) =>
        {
            httpClient
                .post(Config.api.basePath + 'oauth/token')
                .send({
                    grant_type: 'refresh_token',
                    refresh_token: self.token.getRefreshToken(),
                    client_id: Config.client.id,
                    client_secret: Config.client.secret,
                    scope: ''
                })
                .end(function (error, response)
                {
                    if (error)
                    {
                        self.token.remove();
                        reject(error);
                        return;
                    }

                    this.token.save(response);
                });
        });

    }

    /**
     * Set the correct headers on the request.
     *
     * @param request
     * @returns {*}
     */
    setHeaders(request)
    {
        // Set the API header on every request
        request.set('Accept', 'json');

        // Include the bearer header if the JWT cookie is set
        if (this.token.getAccessToken())
        {
            request.set('Authorization', 'Bearer ' + this.token.getAccessToken());
        }

        // Include the socket ID if it is set.
        if (this.socketId) {
            request.set('X-Socket-ID', this.socketId);
        }

        return request;
    }

    /**
     * Intercept the response.
     *
     * @param response
     * @returns {Promise}
     */
    interceptResponse(response)
    {
        let self = this;

        return new Promise((resolve, reject) =>
        {
            // If there's a token in the response...
            if(response.body && response.body.access_token)
            {
                // ...save it.
                self.token.save(response);
            }

            resolve(response);
        })
    }

    /**
     * Get the action URI.
     *
     * @param action
     * @returns {string}
     * @protected
     */
    getAction(action)
    {
        let actionURI = Config.api.basePath + this.getResourceName();

        if(action)
        {
            actionURI += '/' + action;
        }

        return actionURI;
    }

    /**
     * @return {string}
     * @protected
     */
    getResourceName()
    {
        return this.resourceName;
    }

    /**
     * Return a string of URL parameter from an object.
     *
     * @return {string}
     * @protected
     */
    getURIEncodedParameters()
    {
        let self = this;

        return Object.keys(self.parameters).map(k =>
        {
            return encodeURIComponent(k) + '=' + encodeURIComponent(self.parameters[k])
        }).join('&');
    }

    /**
     * Skip the ignored requests.
     *
     * @param request
     * @return {Boolean} Return true if the request was skipped.
     * @private
     */
    skipIgnoredRequests(request)
    {
        for(let i = 0; i < ignoredPaths.length; i++)
        {
            if((new URLPattern('/api' + ignoredPaths[i].action).match(request.url)))
            {
                return true;
            }
        }

        return false;
    }
}
