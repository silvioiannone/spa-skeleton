<script lang="ts">

    import _                  from 'lodash';
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
        initialized: boolean = false;

        get pagination(): any
        {
            return this.$store.getters.app.ui.pagination;
        }

        set pagination(value)
        {
            let newPagination = {
                ...this.$store.getters.app.ui.pagination,
                ...value
            };

            let oldPagination = this.$store.getters.app.ui.pagination;

            // Vuetify can set the sort to an empty string. We set it back to null if that's the
            // case so that the next comparison executes properly.
            if (newPagination.sort === '' || oldPagination.sort === '') {
                newPagination.sort = null;
                oldPagination.sort = null;
            }

            // We need to compare the old and the new pagination with lodash because, even if the
            // value of each key in the pagination object is equivalent, there could be differences
            // (such as a key with an observer in the new pagination but no observer in the old
            // one) that have caused this function to trigger. We want to update the route only if
            // the pagination has actually changed.
            if (_.isEqual(oldPagination, newPagination)) {
                return;
            }

            this.$store.commit('app/INSERT', {
                ui: {
                    newPagination
                }
            });

            if (this.initialized) {
                setTimeout(() => this.updateRoute(newPagination));
            }
        }

        /**
         * Update the route based on the pagination.
         */
        async updateRoute(pagination: Pagination): Promise<void>
        {
            let query = { ...this.$route.query };

            if (pagination.page) {
                query['page'] = pagination.page.toString();
            }

            if (pagination.per_page && pagination.per_page !== Config.app.paginationSize) {
                query['size'] = pagination.per_page.toString();
            }

            if (pagination.sort && pagination.sort.length) {
                query['sort'] = pagination.sort;
            } else {
                delete query['sort'];
            }

            await this.$navigator.push({ path: this.$route.path, query });

            window.scrollTo(0, 0);
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
         * Initialize the pagination in the state machine.
         */
        initPagination(): void
        {
            // Read the query parameters and apply them to the pagination in the state machine.
            let queryParameters = this.$route.query;
            let pagination = {
                descending: false,
                filters: [],
                page: 1,
                per_page: Config.app.paginationSize,
                sort: ''
            };

            if (parseInt(queryParameters.page as string)) {
                pagination.page = parseInt(queryParameters.page as string);
            }

            if (queryParameters.sort) {
                pagination.sort = queryParameters.sort as string;
            }

            if (parseInt(queryParameters.size as string)) {
                pagination.per_page = parseInt(queryParameters.size as string);
            }

            this.pagination = pagination;

            setTimeout(() => this.initialized = true);
        }

        created(): void
        {
            this.initPagination();
        }
    }

    export default ViewPaginated;

</script>
