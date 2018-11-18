import Token  from "spa-skeleton/src/Library/API/Token";
import Config from '../../../Config';

/**
 * Represents an abstract API resouce.
 *
 * @abstract
 */
export default class AbstractApiDriver
{
    constructor()
    {
        this.attachments = [];
        this.resourceName = '';
        this.socketId = '';
        this.token = new Token;
        this.parameters = {};
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
     * @return {AbstractApiDriver}
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
    async _get(action)
    {
        let response = await this.sendGet(action);

        return this.parseResponse(response);
    }

    /**
     * Send a POST HTTP request to the API.
     *
     * @param action
     * @param data
     * @returns {Promise}
     * @protected
     */
    async _post(action, data)
    {
        let response = await this.sendPost(action, data);

        return this.parseResponse(response);
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
    async _patch(action, data)
    {
        let response = await this.sendPatch(action, data);

        return this.parseResponse(response);
    }

    /**
     * Send a DELETE HTTP request to the API.
     *
     * @param {string} action The action that should be added at the end of the path.
     *        E.g.: 'signup' method => 'https://example.com/user/signup'.
     * @param {Object} [data] POST data.
     * @return Promise
     * @protected
     */
    async _delete(action, data)
    {
        let response = await this.sendDelete(action, data);

        return this.parseResponse(response);
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
     * Get the action URI.
     *
     * @param action
     * @returns {string}
     * @protected
     */
    getAction(action)
    {
        // If the action starts with a `.` return it immediately.
        if (action.charAt(0) === '.') {
            return action.slice(1);
        }

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
     * Send a GET HTTP download request to the API.
     *
     * @param {string} action
     * @return {Promise}
     * @abstract
     * @protected
     */
    _download(action)
    {
    }

    /**
     * Override this function in order to specify how the driver should send GET HTTP request.
     *
     * @param {string} action
     * @return {Promise}
     * @abstract
     * @protected
     */
    sendGet(action)
    {
    }

    /**
     * Override this function in order to specify how the driver should send DELETE HTTP request.
     *
     * @param {string} action
     * @param {object} data
     * @return {Promise}
     * @abstract
     * @protected
     */
    sendDelete(action, data)
    {
    }

    /**
     * Override this function in order to specify how the driver should send PATCH HTTP request.
     *
     * @param {string} action
     * @param {object} data
     * @return {Promise}
     * @abstract
     * @protected
     */
    sendPatch(action, data)
    {
    }

    /**
     * Override this function in order to specify how the driver should send POST HTTP request.
     *
     * @param {string} action
     * @param {object} data
     * @return {Promise}
     * @abstract
     * @protected
     */
    sendPost(action, data)
    {
    }

    /**
     * Override this function in order to parse and normalize the response.
     *
     * @return Object An object with the following format:
     *     {
     *         body: {...}
     *     }
     * @abstract
     * @protected
     */
    parseResponse(response) {}
}
