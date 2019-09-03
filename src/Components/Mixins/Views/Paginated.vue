<script lang="ts">

    import { Vue, Component } from 'vue-property-decorator';
    import { Pagination }     from 'spa-skeleton/src/Library/Interfaces/Pagination';
    import { Config, Model }  from 'spa-skeleton';
    import { Query }          from '@vuex-orm/core';

    /*
     * This mixin can be used by all the views that need to display paginated data. E.g.: a view
     * displaying a table with a list of users.
     */
    @Component
    export class ViewPaginated extends Vue
    {
        get pagination(): any
        {
            return this.$store.getters.app.ui.pagination;
        }

        set pagination(value)
        {
            let pagination = { ...this.pagination, ...value };

            this.$store.commit('app/SET', {
                key: 'ui.pagination',
                value: pagination
            });

            setTimeout(() => this.updateRoute(pagination));
        }

        /**
         * Update the route based on the pagination.
         */
        updateRoute(pagination: Pagination): void
        {
            let query = { ...this.$route.query };

            if (pagination.page && pagination.page !== 1) {
                query['page'] = pagination.page.toString();
            }

            if (pagination.per_page && pagination.per_page !== Config.app.paginationSize) {
                query['size'] = pagination.per_page.toString();
            }

            if (pagination.sort && pagination.sort.length) {
                query['sort'] = pagination.sort;
            }

            this.$navigator.push({ path: this.$route.path, query });
        }

        /**
         * Get the paginated resource.
         */
        getPaginatedResource(resource: typeof Model | Query)
        {
            let query = resource instanceof Query ? resource : resource.query();

            let sortParam = this.$route.query.sort as string;

            if (sortParam) {
                // Any query applied before should be ignored otherwise the result of the order will
                // be influenced by the previously run query.

                // Load the previous relationships.
                let oldLoad = query.load;
                query = query.newQuery(query.entity);
                query.load = oldLoad;

                let sortDirection = sortParam.charAt(0) === '-' ? 'desc' : 'asc';
                let sortField = sortDirection === 'desc' ?
                    sortParam.slice(1, sortParam.length) : sortParam;

                query.orderBy(sortField, sortDirection as 'asc' | 'desc');
            }

            return query.get();
        }

        /**
         * Initialize the pagination in the state machine.
         */
        initPagination(): void
        {
            // Read the query parameters and apply them to the pagination in the state machine.
            let queryParameters = this.$route.query;
            let pagination = {};

            if (parseInt(queryParameters.page as string)) {
                pagination['page'] = parseInt(queryParameters.page as string);
            }

            if (queryParameters.sort) {
                pagination['sort'] = queryParameters.sort;
            }

            if (parseInt(queryParameters.size as string)) {
                pagination['per_page'] = parseInt(queryParameters.size as string)
            }

            this.pagination = pagination;
        }

        created(): void
        {
            this.initPagination();
        }
    }

    export default ViewPaginated;

</script>
