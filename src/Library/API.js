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
            let accessorName = key.charAt(0).toLowerCase() + key.slice(1);
            this[accessorName] = new availableAPIResources[key];
        }
    }
}
