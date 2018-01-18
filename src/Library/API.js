import AppAPIResources from 'assets/js/App/API';

// Skeleton API resources
import App from './API/App';
import Notifications from './API/Notifications';
import Users from './API/Users';

const APIResources = {
    App,
    Notifications,
    Users
};

/**
 * App API interface.
 */
export default class API
{
    constructor()
    {
        let availableAPIResources = Object.assign(APIResources, AppAPIResources);

        for (let key in availableAPIResources) {
            this[this.getResourceName(key)] = new availableAPIResources[key];
        }
    }

    /**
     * Set the socket ID.
     *
     * @param socketId
     */
    setSocketId(socketId)
    {
        this.mapResources(resource => resource.setSocketId(socketId));
    }

    /**
     * Remove the socket ID.
     */
    removeSocketId()
    {
        this.mapResources(resource => resource.setSocketId(''));
    }

    /**
     * Loop through the resources and execute a callback.
     *
     * @protected
     * @param {Function} callback The first parameter of the callback is an API resource.
     */
    mapResources(callback)
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
    getResourceName(key)
    {
        // The resource name is just the lowercased key in the API resources.
        return key.charAt(0).toLowerCase() + key.slice(1);
    }
}
