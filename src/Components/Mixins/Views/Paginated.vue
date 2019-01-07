<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';
    import { Route }            from 'vue-router';
    import Config               from '../../../../src/Config';
    import Pagination           from 'spa-skeleton/src/Library/Interfaces/Pagination';

    /*
     * This mixin can be used by all the views that need to display paginated data. E.g.: a view displaying a table with
     * a list of users.
     *
     * How to use it:
     *
     * Override the meta computed value with the pagination object.
     */
    @Component
    export default class ViewPaginated extends Vue
    {
        pagination: Pagination;

        /**
         * This function needs to be overridden by the component using this mixin and it should
         * return the.
         */
        get meta(): any {
            return {}
        }

        /**
         * Initialize the pagination.
         */
        initPagination()
        {
            this.pagination.page = this.$route.query.page || this.meta.current_page || '1';
            this.pagination.rowsPerPage = this.$route.query.size || this.meta.per_page
                || Config.app.paginationSize;
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

        created()
        {
            this.initPagination();
        }

        beforeRouteUpdate(to: Route, from: Route, next: Function)
        {
            this.pagination.page = to.query.page || '1';

            next();
        }

        /**
         * Whenever the pagination changes we need to redirect the router to the right view.
         */
        @Watch('pagination')
        onPaginationChanged(newPagination: any, oldPagination: any)
        {
            // Do not redirect the user if the pagination parameters are the same.
            if (JSON.stringify(newPagination) === JSON.stringify(oldPagination)) {
                return;
            }

            let query = {
                ...this.$route.query,
                page: this.pagination.page
            };

            if (this.pagination.rowsPerPage !== Config.app.paginationSize) {
                query['size'] = this.pagination.rowsPerPage;
            }

            if (this.pagination.descending !== null) {
                query['sort'] = this.pagination.descending ? '-' + this.pagination.sortBy : this.pagination.sortBy;
            } else {
                delete query['sort'];
            }

            this.$router.push({ path: this.$route.path, query });
        }
    }

</script>
