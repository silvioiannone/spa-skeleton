/**
 * Array utilities.
 */
export class Arr
{
    /**
     * Whether an array is empty.
     */
    public static isEmpty(array: any[]): boolean
    {
        return Array.isArray(array) && array.length === 0;
    }
}
