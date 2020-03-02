<script lang="ts">

    import { Query }                             from '@vuex-orm/core';
    import { Component, Watch, Mixins }          from 'vue-property-decorator';
    import { Pagination as PaginationInterface } from '../../../Library/Interfaces/Pagination';
    import { ResponseInterface }                 from '../../../Library/Api/ResponseInterface';
    import { Pagination }                        from '../../../Library/Utils/Pagination';
    import { RequestParametersWatcher }          from './RequestParametersWatcher.vue';
    import { ExtendedModel }                     from '../../../Library/Services/StateMachine/VuexOrm/Support/ExtendedModel';

    /**
     * This mixins handles the pagination and the paginated data displayed by a component.
     */
    @Component
    export class Paginatable extends Mixins(RequestParametersWatcher)
    {
        // We can force the object casting to a `PaginationInterface` since the pagination is
        // initialized in the `created()` Vue lifecycle hook.
        pagination: PaginationInterface = {} as PaginationInterface;

        previousPagination: PaginationInterface = {} as PaginationInterface;

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
        }

        /**
         * Get the paginated data.
         */
        fetchPaginationFromResponse(response: ResponseInterface): void
        {
            this.pagination = Pagination.makeFromResponse(response);
        }

        created(): void
        {
            this.afterResponse(this.fetchPaginationFromResponse);
            this.setParameters(
                Pagination.makeQueryParamsFromPagination(this.pagination)
            );
        }

        @Watch('pagination', { deep: true, immediate: true })
        onPaginationChange(): void
        {
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

            this.previousPagination = { ...this.previousPagination, ...this.pagination };

            this.setParameters(parameters);
        }
    }

    export default Paginatable;

</script>
