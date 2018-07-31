<script>

    import Config from 'spa-skeleton/src/Config';

    /*
     * This mixin can be used by all the views that need to display paginated data. E.g.: a view displaying a table with
     * a list of users.
     *
     * How to use it:
     *
     * Override the meta computed value with the pagination object.
     */
    export default {

        name: 'MixinViewPaginated',

        data()
        {
            return {
                pagination: {}
            }
        },

        computed: {

            /**
             * This function needs to be overridden by the component using this mixin and it should
             * return the.
             */
            meta() {}
        },

        methods: {

            /**
             * Initialize the pagination.
             */
            initPagination()
            {
                this.pagination.page = parseInt(this.$route.query.page) || 1;
                this.pagination.rowsPerPage = parseInt(this.$route.query.size) || Config.app.paginationSize;
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
        },

        created()
        {
            this.initPagination();
        },

        watch: {

            meta()
            {
                this.initPagination();
            },

            /**
             * Whenever the pagination changes we need to redirect the router to the right view.
             */
            pagination(newPagination, oldPagination)
            {
                // Do not redirect the user if the pagination parameters are the same.
                if (JSON.stringify(newPagination) === JSON.stringify(oldPagination)) {
                    return;
                }

                let query = {
                    ...this.$route.query,
                    page: this.pagination.page
                };

                query['size'] = this.pagination.page * this.pagination.rowsPerPage < this.pagination.totalItems ?
                    this.pagination.rowsPerPage :
                    this.pagination.totalItems - this.pagination.rowsPerPage * (this.pagination.page - 1)

                if (this.pagination.descending !== null) {
                    query['sort'] = this.pagination.descending ? '-' + this.pagination.sortBy : this.pagination.sortBy;
                } else {
                    delete query['sort'];
                }

                this.$router.push({ path: this.$route.path, query });
            }
        }
    }

</script>
