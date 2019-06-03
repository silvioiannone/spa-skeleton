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

            let sortParm = this.getParameters().sort;

            if (sortParm) {
                query.orderBy(
                    <string>this.pagination.sortBy,
                    sortParm[0] === '-' ? 'desc': 'asc'
                )
            }

            return query.get();
        }

        /**
         * Get the paginated data.
         */
        whenResponseIsReceived(response: ResponseInterface): void
        {
            this.pagination = { ...Pagination.makeFromResponse(response) };
        }

        /**
         * Take only the bits in a pagination object that should be used when confronting two
         * paginations in order to decide whether or not to fetch new paginated data.
         */
        streamlinePagination(pagination: PaginationInterface)
        {
            return {
                page: pagination.page,
                descending: pagination.descending,
                rowsPerPage: pagination.rowsPerPage,
                sortBy: pagination.sortBy
            }
        }

        created(): void
        {
            this.pagination = Pagination.initialValue();
            this.previousPagination = Pagination.initialValue();
            this.afterResponse(this.whenResponseIsReceived);
            this.setParameters(
                Pagination.makeQueryParamsFromVuetifyPagination(this.pagination)
            );
        }

        @Watch('pagination', { deep: true })
        onPaginationChange()
        {
            let streamlinedNewValue = this.streamlinePagination(this.pagination);
            let streamlinedOldValue = this.streamlinePagination(this.previousPagination);

            if (JSON.stringify(streamlinedOldValue) === JSON.stringify(streamlinedNewValue))  {
                return;
            }

            let newParameters = Pagination.makeQueryParamsFromVuetifyPagination(
                <PaginationInterface>streamlinedNewValue
            );

            // If the `sortBy` or the `descending` props has changed then we need to reset the
            // pagination.
            if (
                (
                    streamlinedNewValue.sortBy !== streamlinedOldValue.sortBy ||
                    streamlinedNewValue.descending !== streamlinedOldValue.descending
                ) && streamlinedNewValue.page !== 1
            ) {
                newParameters['page[number]'] = 1;

                return;
            }

            this.previousPagination = { ...this.pagination };
            this.setParameters(newParameters);
        }
    }

    export default Paginatable;

</script>
