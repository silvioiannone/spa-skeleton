import QS                    from 'qs';
import { Token }             from '../Token';
import { ResponseInterface } from '../ResponseInterface';
import { Config }            from '../../../Config';

/**
 * Represents an abstract API resource.
 *
 * @abstract
 */
export abstract class AbstractApiDriver
{
    /**
     * Attachments.
     */
    protected attachments: any[] = [];

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
    protected token: typeof Token;

    /**
     * Parameters that will be sent with the request.
     */
    protected parameters: {[key: string]: any} = {};

    /**
     * After response hooks.
     */
    protected static afterResponseHooks: ((response: ResponseInterface) => void)[] = [];

    /**
     * Constructor.
     */
    protected constructor()
    {
        this.token = Token;
    }

    /**
     * Parse request data.
     */
    protected parseData(data: { [key: string]: any }): void {
        // If a file is found add it to the attachments and remove it from the request data.
        for (let key in data) {
            let isAnArrayContainigFiles =
                Array.isArray(data[key]) && data[key].length && data[key][0] instanceof File;

            if (isAnArrayContainigFiles || data[key] instanceof File) {
                this.attach(key, data[key]);
                delete data[key];
            }
        }
    }

    /**
     * Register a hook that will be called after a response has been received.
     */
    public static afterResponse(callback: (response: ResponseInterface) => void): void
    {
        AbstractApiDriver.afterResponseHooks.push(callback);
    }

    /**
     * Set the socket ID that will be send with the headers.
     */
    public setSocketId(socketId: string): void
    {
        this.socketId = socketId;
    }

    /**
     * Set the parameters to be sent with the request.
     */
    public setParameters(parameters: any): this
    {
        this.parameters = parameters;

        return this;
    }

    /**
     * Send an HTTP request to the API.
     */
    protected async send(
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
        action: string,
        data?: any
    ): Promise<ResponseInterface>
    {
        let functionName = 'send' + method[0].toUpperCase() + method.substr(1).toLowerCase();
        let response: any = null;

        try {
            response = await this[functionName](action, data);
        } catch (errorResponse) {
            AbstractApiDriver.afterResponseHooks
                .forEach((callback): void => callback(errorResponse));
            throw this.parseResponse(errorResponse);
        }

        AbstractApiDriver.afterResponseHooks.forEach((callback): void => callback(response));

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
    public attach(name: string, file: File): this
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
    public getURIEncodedParameters(): string
    {
        return QS.stringify(this.parameters);
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
