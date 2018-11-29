import CollectionModule from '../../../State/CollectionModule';

/**
 * State machine users module.
 */
export default class Users extends CollectionModule
{
    constructor()
    {
        super();

        this.name = 'users';
    }
}
