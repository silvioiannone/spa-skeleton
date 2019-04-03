<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';

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
    export default class Filterable extends Vue
    {
        filters = {};

        /**
         * Whether the value is an empty array.
         */
        isEmptyArray(value: any): boolean
        {
            return Array.isArray(value) && value.length === 0;
        }

        created()
        {
            // Get the query parameters and if there's a parameter with the same name as the filter
            // then use it to initialize the filters.
            for (let key in this.$route.query)
            {
                if (this.filters.hasOwnProperty(key)) {
                    let filterValue = (<string>this.$route.query[key]).split(',');

                    this.filters[key] = Array.isArray(this.filters[key]) ?
                        filterValue : filterValue[0];
                }
            }
        }

        @Watch('filters', { deep: true })
        onFiltersChange()
        {
            let query = {
                ...this.$route.query,
                page: '1' // When applying a filter always reset the page number.
            };

            for (let key in this.filters) {
                let filterValue = this.filters[key];
                let queryValue = query[key];

                // If a filter is in the query but not in the filters then we remove it.
                if ((! filterValue || this.isEmptyArray(filterValue))) {
                    if (queryValue) {
                        delete query[key];
                    }
                    continue;
                }

                // If the filter is an array then we need to append it.
                query[key] = queryValue && Array.isArray(filterValue) ?
                    filterValue.join(',') : filterValue;
            }

            this.$router.push({ path: this.$route.path, query });
        }
    }

</script>
