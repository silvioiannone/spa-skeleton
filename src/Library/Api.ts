import AbstractResource from './Api/Resources/AbstractResource';
import AppApi           from '../../../../resources/ts/App/Api';

// Skeleton API resources
import App           from './API/Resources/App';
import Notifications from './API/Resources/Notifications';
import Roles         from './API/Resources/Roles';
import Users         from './API/Resources/Users';

const ApiResources = {
    App,
    Notifications,
    Roles,
    Users
};

/**
 * App API interface.
 */
export default class Api extends AppApi
{
    app: App;
    notifications: Notifications;
    roles: Roles;
    users: Users;

    constructor()
    {
        super();

        let availableAPIResources = {...ApiResources, ...AppApi};

        for (let key in availableAPIResources) {
            this[this.getResourceName(key)] = new availableAPIResources[key];
        }
    }

    /**
     * Set the socket ID.
     *
     * @param socketId
     */
    setSocketId(socketId: string): void
    {
        this.mapResources(resource => resource.setSocketId(socketId));
    }

    /**
     * Remove the socket ID.
     */
    removeSocketId(): void
    {
        this.mapResources(resource => resource.setSocketId(''));
    }

    /**
     * Loop through the resources and execute a callback.
     *
     * @protected
     * @param {Function} callback The first parameter of the callback is an API resource.
     */
    mapResources(callback: (resource: AbstractResource) => AbstractResource)
    {
        for (let key in this) {
            callback(this[this.getResourceName(key)]);
        }
    }

    /**
     * Get the api resource name.
     *
     * @protected
     * @param key
     * @returns {string}
     */
    getResourceName(key: string)
    {
        // The resource name is just the lowercased key in the API resources.
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
}
