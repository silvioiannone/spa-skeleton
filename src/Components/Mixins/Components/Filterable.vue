<script lang="ts">

    import { Component, Watch, Mixins } from 'vue-property-decorator';
    import RequestParametersWatcher     from './RequestParametersWatcher.vue';

    @Component
    export default class Filterable extends Mixins(RequestParametersWatcher)
    {
        filters = {};

        initialFilters: string = '';

        /**
         * Get the filter query parameters.
         */
        getFilterParameters(): any
        {
            let parameters = {};

            for (let key in this.filters) {
                let filterValue = this.filters[key];

                if (Array.isArray(filterValue) && !filterValue.length) {
                    parameters['filter[' + key + ']'] = null;
                } else {
                    // If the filter is an array then we need to append it.
                    parameters['filter[' + key + ']'] = Array.isArray(filterValue) ?
                        filterValue.join(',') : filterValue;
                }
            }

            return parameters;
        }

        created()
        {
            // Make a copy of the filters so that later on we can compare this copy with the actual
            // filters in order to know whether there are filters applied.
            this.initialFilters = JSON.stringify(this.filters);

            this.setParameters(this.getFilterParameters());
        }

        @Watch('filters', { deep: true })
        onFiltersChange()
        {
            this.setParameters(this.getFilterParameters());
        }
    }

</script>
