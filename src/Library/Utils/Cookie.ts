/**
 * Cookie management utilities.
 */
export class Cookie
{
    /**
     * Delete a cookie.
     */
    static delete(name: string): void
    {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
