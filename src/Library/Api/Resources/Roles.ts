import ApiResource  from './ApiResource';
import ResponseInterface from '../ResponseInterface';

/**
 * Roles resource.
 */
export default class Roles extends ApiResource
{
    constructor()
    {
        super();

        this.resourceName = 'roles';
    }

    /**
     * Get the roles.
     */
    get(): Promise<ResponseInterface>
    {
        return this._get('');
    }
}
