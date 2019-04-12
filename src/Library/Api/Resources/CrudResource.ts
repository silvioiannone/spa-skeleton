import ApiResource from './ApiResource';

/**
 * An API resource that can be created, fetched, updated and deleted.
 */
export default abstract class CrudResource extends ApiResource
{
    /**
     * Create a resource.
     */
    public create(data: object): Promise<any>
    {
        return this._post('', data);
    }

    /**
     * Update a resource.
     */
    public update(data: object): Promise<any>
    {
        return this._patch('', data);
    }

    /**
     * Get resources.
     */
    public get(id: string = ''): Promise<any>
    {
        return this._get(id);
    }

    /**
     * Delete a resource.
     */
    public delete(data: object): Promise<any>
    {
        return this._delete('', data);
    }
}
