import { ApiResource }  from './ApiResource';
import { ResponseInterface } from '../ResponseInterface';

/**
 * Roles resource.
 */
export class Roles extends ApiResource
{
    public constructor()
    {
        super();

        this.resourceName = 'roles';
    }

    /**
     * Get the roles.
     */
    public get(): Promise<ResponseInterface>
    {
        return this._get('');
    }
}
