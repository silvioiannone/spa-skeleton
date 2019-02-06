<script lang="ts">

    import Vue                  from 'vue';
    import { Component, Watch } from 'vue-property-decorator';

    /**
     * This mixin handles searches performed by a component that can search for data.
     */
    @Component
    export default class Searchable extends Vue
    {
        timeout: NodeJS.Timeout;

        searchQuery: string = '';

        /**
         * Get searched data.
         *
         * This function needs to be overridden.
         */
        getSearchedData(parameters: any): void
        {}

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
                let parameters = {};

                if (this.searchQuery) {
                    parameters['search'] = this.searchQuery;
                }

                this.getSearchedData(parameters);
            }, 500);
        }

        @Watch('searchQuery')
        onSearchQueryChange()
        {
            this.localGetSearchedData();
        }
    }

</script>
