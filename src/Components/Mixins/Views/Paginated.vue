<script lang="ts">

    import { Query }                        from '@vuex-orm/core';
    import Vue                              from 'vue';
    import { Component, Watch }             from 'vue-property-decorator';
    import { Config }                       from '../../../../src/Config';
    import { Pagination }                   from 'spa-skeleton/src/Library/Interfaces/Pagination';
    import { Pagination as PaginationUtil } from '../../../Library/Utils/Pagination';
    import { Model }                        from 'spa-skeleton';

    /*
     * This mixin can be used by all the views that need to display paginated data. E.g.: a view
     * displaying a table with a list of users.
     */
    @Component
    export class ViewPaginated extends Vue
    {
        pagination: Pagination = PaginationUtil.initialValue();

        get meta(): any
        {
            return this.$store.getters.app.ui.pagination;
        }

        /**
         * Get the paginated resource.
         */
        getPaginatedResource(resource: typeof Model | Query)
        {
            let query = resource instanceof Query ? resource : resource.query();

            let sortQueryParamValue = this.$route.query.sort as string;

            if (sortQueryParamValue) {
                // Any query applied before should be ignored otherwise the result of the order will
                // be influenced by the previously run query.

                // Load the previous relationships.
                let oldLoad = query.load;
                query = query.newQuery(query.entity);
                query.load = oldLoad;

                let sortDirection = sortQueryParamValue.charAt(0) === '-' ? 'desc' : 'asc';
                let sortField = sortDirection === 'desc' ?
                    sortQueryParamValue.slice(1, sortQueryParamValue.length) : sortQueryParamValue

                query.orderBy(sortField, sortDirection as 'asc' | 'desc');
            }

            return query.get();
        }

        /**
         * Initialize the pagination.
         */
        initPagination()
        {
            this.pagination.page = this.meta.current_page || '1';
            this.pagination.rowsPerPage = this.meta.per_page || Config.app.paginationSize;
            this.pagination.totalItems = this.meta.total;
            this.pagination.totalPages = this.meta.last_page;

            let sortQueryParam = this.$route.query.sort;

            if (sortQueryParam) {
                if (sortQueryParam[0] === '-') {
                    this.pagination.sortBy = sortQueryParam.slice(1, sortQueryParam.length);
                    this.pagination.descending = true;
                } else {
                    this.pagination.sortBy = sortQueryParam;
                    this.pagination.descending = false;
                }
            } else {
                this.pagination.sortBy = '';
                this.pagination.descending = null;
            }
        }

        @Watch('meta', { deep: true, immediate: true})
        onMetaChange()
        {
            this.initPagination();
        }

        /**
         * Whenever the pagination changes we need to redirect the router to the right view.
         */
        @Watch('pagination', { deep: true })
        onPaginationChange(newPagination: Pagination, oldPagination: Pagination)
        {
            // Do not redirect the user if the pagination parameters are the same.
            if (JSON.stringify(newPagination) === JSON.stringify(oldPagination)) {
                return;
            }

            let query = {
                ...this.$route.query,
                page: this.pagination.page.toString()
            };

            if (newPagination.rowsPerPage !== oldPagination.rowsPerPage ||
                this.pagination.rowsPerPage !== Config.app.paginationSize) {
                query['size'] = this.pagination.rowsPerPage.toString();
            }

            if (this.pagination.descending !== null) {
                query['sort'] = this.pagination.sortBy;
                
                if(this.pagination.descending) {
                    query['sort'] = '-' + query['sort'];
                }
            } else {
                delete query['sort'];
            }

            this.$router.push({ path: this.$route.path, query });
        }
    }

    export default ViewPaginated;

</script>
