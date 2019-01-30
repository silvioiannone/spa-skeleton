import ApiResource       from './Api/Resources/ApiResource';
import AbstractApiDriver from './Api/Drivers/AbstractApiDriver';
import AppResources      from '../../../../resources/ts/App/Api';

// Skeleton API resources
import App           from './Api/Resources/App';
import Notifications from './Api/Resources/Notifications';
import Roles         from './Api/Resources/Roles';
import Users         from './Api/Resources/Users';

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
export default class ApiFactory
{
    /**
     * Api resources.
     */
    static resources: Resources;

    /**
     * Make an Api client.
     */
    static make(): ApiClient
    {
        let client = new Api;

        let availableResources = { ...ApiResources, ...AppResources };

        let resources = {};

        for (let key in availableResources) {
            resources[key] = new availableResources[key];
        }

        ApiFactory.resources = <Resources>resources;

        return { ...client, ...ApiFactory.resources };
    }

    /**
     * Set the socket ID.
     */
    static setSocketId(socketId: string): void
    {
        this.mapResources(resource => resource.setSocketId(socketId));
    }

    /**
     * Remove the socket ID.
     */
    static removeSocketId(): void
    {
        this.mapResources(resource => resource.setSocketId(''));
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
    static getResourceName(key: string): string
    {
        // The resource name is just the lowercased key in the API resources.
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
}
