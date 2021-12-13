<script lang="ts">

import RequestParametersWatcher from './RequestParametersWatcher.vue';

export default {

    name: 'Filterable',

    mixins: [RequestParametersWatcher],

    data()
    {
        return {
            filters: {}
        }
    },

    methods: {
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

            // If the view has any pagination related parameters we need to reset those.
            if (this.getParameters().hasOwnProperty('page[number]')) {
                parameters['page[number]'] = 1;
            }

            return parameters;
        }
    },

    created(): void
    {
        this.mergeParameters(this.getFilterParameters());

        this.$watch('filters', () => {
            this.mergeParameters(this.getFilterParameters());
        }, { deep: true });
    }
}

</script>
