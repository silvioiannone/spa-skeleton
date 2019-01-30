import Config from '../../../Config';

const ApiDriver = Config.api.drivers[Config.api.driver];

/**
 * An API abstract resource.
 */
export default abstract class ApiResource extends ApiDriver
{

}
