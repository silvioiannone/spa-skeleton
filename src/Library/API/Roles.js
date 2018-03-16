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
    all()
    {
        return this._get('');
    }
}
