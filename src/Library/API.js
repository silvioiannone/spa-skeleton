import App   from './API/App';
import Users from './API/Users';

/**
 * App API interface.
 */
export default class API
{
    constructor()
    {
        this.app = new App;
        this.users = new Users;
    }
}