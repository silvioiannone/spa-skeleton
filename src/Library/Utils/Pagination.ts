import { Config }                            from '../../Config';
import URIjs                                 from 'urijs';
import { ResponseInterface }                 from '../Api/ResponseInterface';
import { Pagination as PaginationInterface } from '../Interfaces/Pagination';

/**
 * Provides pagination utilities.
 */
let Pagination = {

    /**
     * Create a pagination object from a server response.
     */
    makeFromResponse(response: ResponseInterface): PaginationInterface
    {
        let meta = response.body.meta;
        let uri = URIjs(response.request.url);
        let pagination = this.makeFromMetaObject(meta);

        pagination.sort = uri.search(true).sort;

        return pagination;
    },

    /**
     * Create a pagination object from a meta object.
     */
    makeFromMetaObject(meta: any): PaginationInterface
    {
        return {
            page: meta.current_page,
            per_page: meta.per_page,
            total: meta.total,
            last_page: meta.last_page,
            sort: ''
        }
    },

    /**
     * Create an object containing query parameters starting from the Vuetify pagination object.
     */
    makeQueryParamsFromPagination(pagination: PaginationInterface): any
    {
        return {
            'page[size]': pagination.per_page || Config.app.paginationSize,
            'page[number]': pagination.page || 1,
            sort: pagination.sort
        };
    }
}

export { Pagination };
