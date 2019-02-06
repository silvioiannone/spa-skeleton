<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';

    @Component
    export default class Filterable extends Vue
    {
        filters = {};

        initialFilters = {};

        /**
         * Whether filters are applied.
         */
        hasFilters(): boolean
        {
            return JSON.stringify(this.filters) !== this.initialFilters;
        }

        /**
         * Whether the value is an empty array.
         */
        isEmptyArray(value: any): boolean
        {
            return Array.isArray(value) && value.length === 0;
        }

        /**
         * Get the filtered data.
         *
         * Override this function in order to filter the data.
         */
        getFilteredData(params: any) {}

        /**
         * Get the filter query parameters.
         */
        getFilterParameters(): any
        {
            let parameters = {};

            for (let key in this.filters) {
                let filterValue = this.filters[key];

                if (Array.isArray(filterValue) && !filterValue.length) {
                    continue;
                }

                // If the filter is an array then we need to append it.
                parameters['filter[' + key + ']'] = Array.isArray(filterValue) ?
                    filterValue.join(',') : filterValue;
            }

            return parameters;
        }

        created()
        {
            // Make a copy of the filters so that later on we can compare this copy with the actual
            // filters in order to know whether there are filters applied.
            this.initialFilters = JSON.stringify(this.filters);
        }

        @Watch('filters', { deep: true })
        onFiltersChange()
        {
            this.getFilteredData(this.getFilterParameters());
        }
    }

</script>
