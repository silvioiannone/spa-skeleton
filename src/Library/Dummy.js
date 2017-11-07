/**
 * This class gives access to a dummy object.
 *
 * A dummy object is an object that has every possible property set to null.
 *
 * For example:
 *
 *    let dummy = (new Dummy()).generate();
 *    console.log(dummy.a); // prints: null
 *    console.log(dummy.nonExistingProperty); // prints:null.
 */
export default class Dummy
{
    /**
     * Generate a new dummy.
     *
     * @return {Proxy}
     */
    generate()
    {
        return new Proxy({}, this.getHandler());
    }

    /**
     * Get the proxy object handler.
     * @protected
     */
    getHandler()
    {
        return {
            get: (target, name) => null
        }
    }
}
