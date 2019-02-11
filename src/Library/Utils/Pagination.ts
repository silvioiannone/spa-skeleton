import Config            from '../../Config';
import URIjs             from 'urijs';
import ResponseInterface from '../Api/ResponseInterface';
import Pagination        from '../Interfaces/Pagination';

type PartialPagination = {
    [P in keyof Pagination]?: Pagination[P]
}

/**
 * Provides pagination utilities.
 */
export default {

    /**
     * Get the initial value for the pagination.
     */
    initialValue(override: PartialPagination = {}): Pagination
    {
        return {
            page: 1,
            rowsPerPage: Config.app.paginationSize,
            totalItems: 0,
            totalPages: 1,
            sortBy: <string | Array<string>>'',
            descending: false,
            ...override
        }
    },

    /**
     * Create a pagination object from a server response.
     */
    makeFromResponse(response: ResponseInterface): Pagination
    {
        let meta = response.body.meta;
        let uri = URIjs(response.request.url);

        let pagination = this.makeFromMetaObject(meta);

        let sortValue = uri.search(true).sort;
        if (sortValue) {
            if (sortValue[0] === '-') {
                pagination.sortBy = sortValue.slice(1, sortValue.length);
                pagination.descending = true;
            } else {
                pagination.sortBy = sortValue;
                pagination.descending = false;
            }
        } else {
            pagination.sortBy = '';
            pagination.descending = null;
        }

        return pagination;
    },

    /**
     * Create a pagination object from a meta object.
     */
    makeFromMetaObject(meta: any): Pagination
    {
        return {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            totalItems: meta.total,
            totalPages: meta.last_page,
            sortBy: [],
            descending: false
        }
    },

    /**
     * Create an object containing query parameters starting from the Vuetify pagination object.
     */
    makeQueryParamsFromVuetifyPagination(pagination: Pagination): any
    {
        let parameters = {
            'page[size]': pagination.rowsPerPage || Config.app.paginationSize,
            'page[number]': pagination.page || 1,
            'sort': ''
        }

        if(pagination.sortBy && pagination.descending !== null) {
            parameters.sort = <string>(
                pagination.descending ? '-' + pagination.sortBy : pagination.sortBy
            );
        }

        return parameters;
    }
}
