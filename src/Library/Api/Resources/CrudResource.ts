import ApiResource from './ApiResource';

/**
 * An API resource that can be created, fetched, updated and deleted.
 */
export default abstract class CrudResource extends ApiResource
{
    /**
     * Create a resource.
     */
    create(data: object): Promise<any>
    {
        return this._post('', data);
    }

    /**
     * Update a resource.
     */
    update(data: object): Promise<any>
    {
        return this._patch('', data);
    }

    /**
     * Get resources.
     */
    get(id: string = ''): Promise<any>
    {
        return this._get(id);
    }

    /**
     * Delete a resource.
     */
    delete(data: object): Promise<any>
    {
        return this._delete('', data);
    }
}
