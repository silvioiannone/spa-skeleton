import { ApiResource }       from './Api/Resources/ApiResource';
import { AbstractApiDriver } from './Api/Drivers/AbstractApiDriver';
import AppResources          from '@/ts/App/Api';

// Skeleton API resources
import { App }           from './Api/Resources/App';
import { Notifications } from './Api/Resources/Notifications';
import { Roles }         from './Api/Resources/Roles';
import { Users }         from './Api/Resources/Users';

const ApiResources = {
    app: App,
    notifications: Notifications,
    roles: Roles,
    users: Users
};

export type ResourcesList = typeof ApiResources & typeof AppResources;
export type Resources = {
    [P in keyof ResourcesList]: ResourcesList[P]['prototype'] & AbstractApiDriver
}
export type ApiClient = Api & Resources;

/**
 * App API interface.
 */
class Api
{

}

/**
 * A factory that creates API clients.
 */
export class ApiFactory
{
    /**
     * Api resources.
     */
    public static resources: Resources;

    /**
     * Make an Api client.
     */
    public static make(): ApiClient
    {
        let client = new Api;

        let availableResources = { ...ApiResources, ...AppResources };

        let resources = {};

        for (let key in availableResources) {
            resources[key] = new availableResources[key];
        }

        ApiFactory.resources = resources as Resources;

        return { ...client, ...ApiFactory.resources };
    }

    /**
     * Set the socket ID.
     */
    public static setSocketId(socketId: string): void
    {
        this.mapResources((resource): ApiResource => resource.setSocketId(socketId));
    }

    /**
     * Remove the socket ID.
     */
    public static removeSocketId(): void
    {
        this.mapResources((resource): ApiResource => resource.setSocketId(''));
    }

    /**
     * Loop through the resources and execute a callback.
     */
    protected static mapResources(callback: (resource: ApiResource) => ApiResource): void
    {
        for (let key in ApiFactory.resources) {
            callback(ApiFactory.resources[ApiFactory.getResourceName(key)]);
        }
    }

    /**
     * Get the api resource name.
     */
    public static getResourceName(key: string): string
    {
        // The resource name is just the lower-cased key in the API resources.
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
}
