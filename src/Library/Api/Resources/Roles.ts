import AbstractResource  from './AbstractResource';
import ResponseInterface from '../ResponseInterface';

/**
 * Roles resource.
 */
export default class Roles extends AbstractResource
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
