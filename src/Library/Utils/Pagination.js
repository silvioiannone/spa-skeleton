import Config from '../../Config';
import URIjs from 'urijs';

/**
 * Provides pagination utilities.
 */
export default
{
    /**
     * Create a pagination object from a server response.
     *
     * @param data
     * @return Object
     */
    makeFromResponse(response)
    {
        let meta = response.body.meta;
        let uri = URIjs(response.req.url);

        let pagination = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            totalItems: meta.total,
            totalPages: meta.last_page
        };

        let sortValue = uri.search(true).sort;
        if (sortValue) {
            if (sortValue[0] === '-') {
                pagination.sortBy = sortValue.slice(1, sortValue.length);
                pagination.descending = true;
            } else {
                pagination.sortBy = sortValue;
                pagination.descending = ''
            }
        } else {
            pagination.sortBy = '';
            pagination.descending = null;
        }

        return pagination;
    },

    /**
     * Create an object containing query parameters starting from the Vuetify pagination object.
     *
     * @param pagination {Object} Vuetify pagination object.
     */
    makeQueryParamsFromVuetifyPagination(pagination)
    {
        let parameters = {
            'page[size]': pagination.rowsPerPage || Config.app.paginationSize,
            'page[number]': pagination.page || 1
        }

        if(pagination.sortBy && pagination.descending !== null) {
            parameters.sort = pagination.descending ?
                '-' + pagination.sortBy : pagination.sortBy;
        }

        return parameters;
    }
}


// WEBPACK FOOTER //
// ./node_modules/spa-skeleton/src/Library/Utils/Pagination.js