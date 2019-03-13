# Models

Models represents server-side entities (models) and sit between the state machine and the API.

Models can perform API request and parse the responses in order to keep the state machine 
synchronized with the server side data.

## Defining new models

New model can be created in *resources/ts/App/State/Models*:

    import { Fields }                   from '@vuex-orm/core';
    import { Model, ResponseInterface } from 'spa-skeleton';
    import User                         from './User';

    export default class Company extends Model
    {
        static entity = 'companies';
        
        /**
         * Model fields.
         */
        static fields(): Fields
        {
            return {
                id: this.attr(null),
                owner: this.attr(null),
                name: this.attr(''),
                users: this.hasMany(User, 'company_id')
            }
        }
        
        /**
         * Retrieve the company users.
         */
        static $users(id: string, parameters: any = {}): Promise<ResponseInterface>
        {
            let promise = Company.api(api =>
            {
                return api.companies
                    .setParameters(parameters)
                    .users(id);
            });
    
            promise.then((response: ResponseInterface) =>
            {
                User.create(response.body);
            });
    
            return promise;
        }
    }
    
    // resources/ts/App/State/Models/Company.ts

Onse a new model has been defined it needs to be registered:

    import Company from './Models/Company';
    
    export default {
        Company
    }
    
    // resources/ts/App/State/Models.ts

---

[More info about Models](https://vuex-orm.github.io/vuex-orm/).
