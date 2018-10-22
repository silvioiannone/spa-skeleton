import AbstractResource from './AbstractResource';

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
    get()
    {
        return this._get('');
    }
}
