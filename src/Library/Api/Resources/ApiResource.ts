import { Config } from '../../../Config';

const ApiDriver = Config.api.drivers[Config.api.driver];

/**
 * An API abstract resource.
 */
export abstract class ApiResource extends ApiDriver
{

}
