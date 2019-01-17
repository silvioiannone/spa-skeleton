<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import Config               from '../../../../src/Config';
    import Pagination           from 'spa-skeleton/src/Library/Interfaces/Pagination';
    import { Model }            from 'spa-skeleton';

    /*
     * This mixin can be used by all the views that need to display paginated data. E.g.: a view
     * displaying a table with
     * a list of users.
     *
     * How to use it:
     *
     * Override the resource computed value.
     */
    @Component
    export default class ViewPaginated extends Vue
    {
        pagination: Pagination = {
            page: 0,
            rowsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
            descending: false,
            sortBy: ''
        };

        get meta(): any
        {
            return this.$store.getters.app.ui.pagination;
        }

        /**
         * Get the paginated resource.
         */
        getPaginatedResource(resource: typeof Model)
        {
            let query = resource.query();
            let sortQueryParam = this.$route.query.sort;

            if (sortQueryParam) {
                query.orderBy(
                    <string>this.pagination.sortBy,
                    sortQueryParam[0] === '-' ? 'desc': 'asc'
                );
            }

            return query.all();
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

</script>
