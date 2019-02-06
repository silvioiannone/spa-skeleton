<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import PaginationInterface  from '../../../Library/Interfaces/Pagination';
    import ResponseInterface    from '../../../Library/Api/ResponseInterface';
    import Pagination           from '../../../Library/Utils/Pagination';

    /**
     * This mixins handles the pagination and the paginated data displayed by a component.
     */
    @Component
    export default class Paginatable extends Vue
    {
        pagination: PaginationInterface = Pagination.initialValue();

        /**
         * Get the paginated data.
         *
         * This function needs to be overridden.
         */
        getPaginatedData(parameters: any): Promise<ResponseInterface>
        {
            return <Promise<ResponseInterface>><unknown>false;
        }

        /**
         * Get the paginated data.
         */
        async localGetPaginatedData(): Promise<any>
        {
            let parameters = Pagination.makeQueryParamsFromVuetifyPagination(this.pagination);

            let response = await this.getPaginatedData(parameters);

            this.pagination = { ...Pagination.makeFromResponse(response) }
        }

        mounted(): void
        {
            this.localGetPaginatedData();
        }

        @Watch('pagination')
        onPaginationChange(oldPagination: PaginationInterface, newPagination: PaginationInterface)
        {
            if (JSON.stringify(oldPagination) === JSON.stringify(newPagination)) {
                return;
            }

            this.localGetPaginatedData();
        }
    }

</script>
