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
    attachments: Array<any> = [];

    /**
     * Resource name.
     */
    resourceName: string;

    /**
     * Socket ID for the WS connection.
     */
    socketId: string;

    /**
     * Authentication token.
     */
    token: Token;

    /**
     * Parameters that will be sent with the request.
     */
    parameters: {[key: string]: any};

    /**
     * Constructor.
     */
    protected constructor()
    {
        this.token = new Token;
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
     * Send a GET HTTP request to the API.
     */
    protected async _get(action: string): Promise<ResponseInterface>
    {
        let response = await this.sendGet(action);

        return this.parseResponse(response);
    }

    /**
     * Send a POST HTTP request to the API.
     */
    protected async _post(action: string, data: any): Promise<ResponseInterface>
    {
        let response = await this.sendPost(action, data);

        return this.parseResponse(response);
    }

    /**
     * Send a PATCH HTTP request to the API.
     */
    protected async _patch(action: string, data: any): Promise<ResponseInterface>
    {
        let response = await this.sendPatch(action, data);

        return this.parseResponse(response);
    }

    /**
     * Send a DELETE HTTP request to the API.
     */
    protected async _delete(action: string, data: any): Promise<ResponseInterface>
    {
        let response = await this.sendDelete(action, data);

        return this.parseResponse(response);
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
    protected getAction(action: string): string
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
