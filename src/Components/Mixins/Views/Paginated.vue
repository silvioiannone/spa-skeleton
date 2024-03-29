<script lang="ts">

import { isEqual } from 'lodash';
import { Pagination } from '../../../Library/Interfaces/Pagination';
import { Config, Model } from '../../../index';
import { Query } from '@vuex-orm/core';

/**
 * This mixin can be used by all the views that need to display paginated data. E.g.: a view
 * displaying a table with a list of users.
 */
export default {

    name: 'ViewPaginated',

    data() {
        return {
            leaving: false,
            initialized: false
        }
    },

    computed: {

        pagination: {
            get(): any
            {
                return this.$store.getters.app.ui.pagination;
            },
            set(value)
            {
                let newPagination = {
                    ...this.$store.getters.app.ui.pagination,
                    ...value
                };

                let oldPagination = this.$store.getters.app.ui.pagination;

                // Vuetify can set the sort to an empty string. We set it back to null if that's the
                // case so that the next comparison executes properly.
                if (newPagination.sort === '') {
                    newPagination.sort = null;
                }

                if (oldPagination.sort === '') {
                    oldPagination.sort = null;
                }

                // We need to compare the old and the new pagination with lodash because, even if the
                // value of each key in the pagination object is equivalent, there could be differences
                // (such as a key with an observer in the new pagination but no observer in the old one)
                // that have caused this function to trigger. We want to update the route only if the
                // pagination has actually changed.
                if (this.initialized) {
                    if (isEqual(oldPagination, newPagination)) {
                        return;
                    }

                    this.$store.commit('app/INSERT', {
                        ui: {
                            pagination: newPagination
                        }
                    });

                    setTimeout(() => this.updateRoute(newPagination));
                }
            }
        }
    },

    methods: {
        /**
         * Update the route based on the pagination.
         */
        async updateRoute(pagination: Pagination): Promise<void>
        {
            if (this.leaving) {
                return;
            }

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

            await this.$navigator.push({ query });

            window.scrollTo(0, 0);
        },

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
        },

        /**
         * Initialize the pagination in the state machine.
         */
        initPagination(): void
        {
            // Read the query parameters and apply them to the pagination in the state machine.
            let queryParameters = this.$route.query;
            let pagination = {
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
    },

    beforeRouteLeave(to, from, next): void
    {
        this.leaving = true;

        next();
    },

    beforeRouteUpdate(to, from, next): void
    {
        this.leaving = false;

        next();
    },

    created(): void
    {
        this.initPagination();
    }
}

</script>
