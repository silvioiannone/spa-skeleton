<script lang="ts">

import { Query } from '@vuex-orm/core';
import { Config } from '../../../Config';
import { Pagination as PaginationInterface } from '../../../Library/Interfaces/Pagination';
import { ResponseInterface } from '../../../Library/Api/ResponseInterface';
import { Pagination } from '../../../Library/Utils/Pagination';
import RequestParametersWatcher from './RequestParametersWatcher.vue';
import { ExtendedModel } from '../../../Library/Services/StateMachine/VuexOrm/Support/ExtendedModel';

/**
 * This mixins handles the pagination and the paginated data displayed by a component.
 */
export default {

    mixins: [RequestParametersWatcher],

    data()
    {
        return {
            // We can force the object casting to a `PaginationInterface` since the pagination is
            // initialized in the `created()` Vue lifecycle hook.
            pagination: {} as PaginationInterface,
            previousPagination: {} as PaginationInterface
        }
    },

    methods: {
        /**
         * Get the paginated resource.
         */
        getPaginatedResource(resource: typeof ExtendedModel | Query)
        {
            let query = resource instanceof Query ? resource : resource.query();

            let sortParam = this.getParameters().sort;

            if (sortParam) {
                // Any query applied before should be ignored otherwise the result of the order will
                // be influenced by the previously run query.

                // Load the previous relationships.
                let oldLoad = query.load;
                let oldWheres = query.wheres;
                query = query.newQuery(query.entity);
                query.load = oldLoad;
                query.wheres = oldWheres;

                let sortDirection = sortParam.charAt(0) === '-' ? 'desc' : 'asc';
                let sortField = sortDirection === 'desc' ?
                    sortParam.slice(1, sortParam.length) : sortParam;

                query.orderBy(sortField, sortDirection as 'asc' | 'desc');
            }

            return query.get();
        },

        /**
         * Get the paginated data.
         */
        fetchPaginationFromResponse(response: ResponseInterface): void
        {
            this.pagination = Pagination.makeFromResponse(response);
        },

        /**
         * Initialize the pagination.
         */
        initPagination(): void
        {
            this.pagination = {
                page: 1,
                per_page: Config.app.paginationSize,
                sort: '',
                total: 0,
                last_page: 1
            };
        },

        /**
         * Set the pagination.
         */
        setPagination(pagination: PaginationInterface)
        {
            this.previousPagination = { ...this.pagination };

            this.pagination = pagination;

            // The only properties which should be watched are `page`, `per_page` and `sort`, and
            // we update the parameters only if one of those have changed.
            if (this.pagination.page === this.previousPagination.page &&
                this.pagination.per_page === this.previousPagination.per_page &&
                this.pagination.sort === this.previousPagination.sort) {
                return;
            }

            let parameters = Pagination.makeQueryParamsFromPagination(
                this.pagination as PaginationInterface
            );

            // If the `sortBy` or the `descending` props has changed then we need to reset the
            // pagination.
            if (this.previousPagination.sort !== undefined &&
                this.pagination.sort !== this.previousPagination.sort &&
                this.pagination.page !== 1) {
                parameters['page[number]'] = 1;
            }

            this.previousPagination = { ...this.pagination };

            this.mergeParameters(parameters);
        }
    },

    created(): void
    {
        this.initPagination();
        this.afterResponse(this.fetchPaginationFromResponse);
    }
}

</script>
