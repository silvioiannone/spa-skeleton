<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';

    /*
     * The purpose of this mixin is to facilitate the use of server-side filters.
     *
     * Usage: simply define the value of your filters in the `filters` data object. E.g.:
     *
     *     filters: {
     *         identity_verification_status: null
     *     }
     */
    @Component
    export class Filterable extends Vue
    {
        filters = {};

        /**
         * Synch the filters with the ones in the store.
         */
        syncStore(): void
        {
            // Get the applied filters from the store and initialize the local ones.
            this.$store.getters.app.ui.filters.forEach((filter: any): void => {
                if (this.filters.hasOwnProperty(filter.name)) {
                    if (Array.isArray(this.filters[filter.name])) {
                        this.filters[filter.name] = filter.value.split(',');
                    } else {
                        this.filters[filter.name] = filter.value;
                    }
                }
            });
        }

        /**
         * Update a boolean filter.
         */
        updateBooleanFilter(filter: string, value: boolean)
        {
            this.filters[filter] = value ? 'true' : 'false';
        }

        created(): void
        {
            this.syncStore();
        }

        @Watch('filters', { deep: true })
        onFiltersChange()
        {
            let query = { ...this.$route.query };

            // When applying a filter always reset the page number.
            if (query.page !== '1') {
                query.page = '1'
            }

            let queryFilters = {};

            for (let key in this.filters) {
                let filterValue = this.filters[key];
                let queryValue = query[key];

                // If a filter is in the query but not in the filters then we remove it.
                if ((filterValue === null || this.$utils.array.isEmpty(filterValue))) {
                    if (queryValue) {
                        delete query[key];
                    }
                    continue;
                }

                // If the filter is an array then we need to append it.
                queryFilters[key] = Array.isArray(filterValue) ?
                    filterValue.join(',') : filterValue;
            }

            query = {
                ...query,
                ...queryFilters
            };

            this.$navigator.push({ query });
        }
    }

    export default Filterable;

</script>
