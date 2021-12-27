<script lang="ts">

import RequestParametersWatcher from './RequestParametersWatcher.vue';

/**
 * This mixin handles searches performed by a component that can search for data.
 */
export default {

    mixins: [RequestParametersWatcher],

    data()
    {
        return {
            timeout: null as NodeJS.Timeout,
            searchQuery: ''
        }
    },

    methods: {
        /**
         * Get the searched data.
         */
        localGetSearchedData(): void
        {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() =>
            {
                let parameters = this.getParameters();

                parameters.search = this.searchQuery ? this.searchQuery : null;

                // If the view has any pagination related parameters we need to reset those.
                if (parameters.hasOwnProperty('page[number]')) {
                    parameters['page[number]'] = 1;
                }

                this.mergeParameters(parameters);
            }, 500);
        }
    },

    created(): void
    {
        this.mergeParameters({
            search: null
        });
    },

    watch: {

        searchQuery(): void
        {
            this.localGetSearchedData();
        }
    }
}

</script>
