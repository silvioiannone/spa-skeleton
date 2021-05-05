<script lang="ts">

    import { Component, Watch, Mixins } from 'vue-property-decorator';
    import RequestParametersWatcher from './RequestParametersWatcher.vue';

    /**
     * This mixin handles searches performed by a component that can search for data.
     */
    @Component
    export class Searchable extends Mixins(RequestParametersWatcher)
    {
        timeout: NodeJS.Timeout;

        searchQuery: string = '';

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

        created(): void
        {
            this.mergeParameters({
                search: null
            });
        }

        @Watch('searchQuery')
        onSearchQueryChange()
        {
            this.localGetSearchedData();
        }
    }

    export default Searchable;

</script>
