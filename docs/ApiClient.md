#API Client

`spa-skeleton` ships with an API client that is ready to send requests to the backend server.

## Extending the API client

The api client can be easily extended by defining new resource modules.

    import { ApiResource, ResponseInterface } from 'spa-skeleton';

    /**
     * Companies API module.
     */
    export default class Companies extends ApiResource
    {
        protected resourceName: string = 'companies';
    
        /**
         * Get a company.
         */
        get(id: any): Promise<ResponseInterface>
        {
            return this._get('', id');
        }
    }
    
    // resources/ts/App/Api/Companies.ts
    
Once an API module has been defined then it's enough to import it in *resources/ts/App/Api.ts*:

    import Companies from './Api/Companies';

    export default {
        Companies
    }
    
    // resources/ts/App/Api.ts
    
### CRUD API resources

In addition to the normal API resources it's also possible to use a so called "CRUD Resource". This
is simply an API resource that already defines some CRUD methods:

    import { CrudResource } from 'spa-skeleton';
    
    export default class Companies extends CrudResource
    {
        ...
    }
    
## Usage

### From components

Once a module has been registered it can be accessed from within any component:

    this.$api.companies.get(3)
    
### Adding additional parameters

Additional parameters can be specified before sending a request using the `setParameters` method:

    this.$api.companies
        .setParameters({
            name: 'Company & Co.'
        })
        .create();
        
### Attaching a file

Files can be attached to the request using the `attach` method:

    this.$api.companies
        .attach('avatar', avatarFile)
        .uploadAvatar();
    
## Sending HTTP requests

It's possible to send HTTP requests using the following methods within an API module:

### GET

    this._get(action): Promise<ResponseInterface>

### DELETE

    this._delete(action, payload): Promise<ResponseInterface>

### PATCH

    this._patch(action, payload): Promise<ResponseInterface>

### POST

    this._post(action, payload): Promise<ResponseInterface>
