import Token             from '../Token';
import ResponseInterface from '../ResponseInterface';
import Config            from '../../../Config';

/**
 * Represents an abstract API resouce.
 *
 * @abstract
 */
export default abstract class AbstractApiDriver
{
    /**
     * Attachments.
     */
    protected attachments: Array<any> = [];

    /**
     * Resource name.
     */
    protected resourceName: string;

    /**
     * Socket ID for the WS connection.
     */
    protected socketId: string;

    /**
     * Authentication token.
     */
    protected token: Token;

    /**
     * Parameters that will be sent with the request.
     */
    protected parameters: {[key: string]: any} = {};

    /**
     * After response hooks.
     */
    protected static afterResponseHooks: Array<(response: ResponseInterface) => void> = [];

    /**
     * Constructor.
     */
    protected constructor()
    {
        this.token = new Token;
    }

    /**
     * Register a hook that will be called after a response has been received.
     */
    static afterResponse(callback: (response: ResponseInterface) => void): void
    {
        AbstractApiDriver.afterResponseHooks.push(callback);
    }

    /**
     * Set the socket ID that will be send with the headers.
     */
    setSocketId(socketId: string): void
    {
        this.socketId = socketId;
    }

    /**
     * Set the parameters to be sent with the request.
     */
    setParameters(parameters: any): this
    {
        this.parameters = parameters;

        return this;
    }

    /**
     * Send an HTTP request to the API.
     */
    protected async send(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', action: string, data?: any)
    {
        let functionName = 'send' + method[0].toUpperCase() + method.substr(1).toLowerCase();
        let response: any = null;

        try {
            response = await this[functionName](action, data);
        } catch (errorResponse) {
            AbstractApiDriver.afterResponseHooks.forEach(callback => callback(errorResponse));
            throw this.parseResponse(errorResponse);
        }

        AbstractApiDriver.afterResponseHooks.forEach(callback => callback(response));

        return this.parseResponse(response);
    }

    /**
     * Send a GET HTTP request to the API.
     */
    protected _get(action: string): Promise<ResponseInterface>
    {
        return this.send('GET', action);
    }

    /**
     * Send a POST HTTP request to the API.
     */
    protected async _post(action: string, data: any): Promise<ResponseInterface>
    {
        return this.send('POST', action, data);
    }

    /**
     * Send a PATCH HTTP request to the API.
     */
    protected async _patch(action: string, data: any): Promise<ResponseInterface>
    {
        return this.send('PATCH', action, data);
    }

    /**
     * Send a DELETE HTTP request to the API.
     */
    protected async _delete(action: string, data: any): Promise<ResponseInterface>
    {
        return this.send('DELETE', action, data);
    }

    /**
     * Attach a file to the request. This will only work with a POST request.
     */
    attach(name: string, file: File): this
    {
        this.attachments.push({
            name, file
        });

        return this;
    }

    /**
     * Get the action URI.
     */
    protected getAction(action: string | number): string
    {
        // If the action starts with a `.` return it immediately.
        if (typeof action === 'string' && action.charAt(0) === '.') {
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
     * Get the resource name.
     */
    protected getResourceName(): string
    {
        return this.resourceName;
    }

    /**
     * Return a string of URL parameter from an object.
     */
    getURIEncodedParameters(): string
    {
        let self = this;

        return Object.keys(self.parameters).map(k =>
        {
            return encodeURIComponent(k) + '=' + encodeURIComponent(self.parameters[k])
        }).join('&');
    }

    /**
     * Send a GET HTTP download request to the API.
     */
    protected abstract _download(action: string): Promise<any>;

    /**
     * Override this function in order to specify how the driver should send GET HTTP request.
     */
    protected abstract sendGet(action: string): Promise<any>

    /**
     * Override this function in order to specify how the driver should send DELETE HTTP request.
     */
    protected abstract sendDelete(action: string, data: any): Promise<any>

    /**
     * Override this function in order to specify how the driver should send PATCH HTTP request.
     */
    protected abstract sendPatch(action: string, data: any): Promise<any>

    /**
     * Override this function in order to specify how the driver should send POST HTTP request.
     */
    protected abstract sendPost(action: string, data: any): Promise<any>

    /**
     * Override this function in order to parse and normalize the response.
     */
    protected abstract parseResponse(response: any): ResponseInterface
}
