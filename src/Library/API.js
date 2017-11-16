import Log from 'loglevel';
import AppAPIResources from 'assets/js/App/API';

// Skeleton API resources
import App from './API/App';
import Users from './API/Users';

const APIResources = {
    App
}

/**
 * App API interface.
 */
export default class API
{
    constructor()
    {
        let availableAPIResources = {};
        availableAPIResources = Object.assign(APIResources, AppAPIResources);

        for (let key in availableAPIResources) {
            let accessorName = key.charAt(0).toLowerCase() + key.slice(1);
            this[accessorName] = new availableAPIResources[key];

            Log.debug('API resource "' + key + '" registered (accessible using "'
                + accessorName + '").');
        }
    }
}
