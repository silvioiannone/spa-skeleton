<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import { TextField }                      from './TextField.vue';

    /**
     * This mixin can be used to build autocomplete inputs.
     *
     * Override the search function and use it to retrieve some data from the server.
     */
    @Component
    export class Autocomplete extends Mixins(TextField)
    {
        /**
         * Model.
         */
        @Prop() value: any;

        /**
         * Can be an array of objects or array of strings. When using objects, will look for a
         * text and value field. This can be changed using the item-text and item-value props.
         */
        @Prop({ type: Array, default: () => [] }) items: Array<any>;

        /**
         * Set property of items's text value
         */
        @Prop({ type: String, default: 'text' }) itemText: string;

        /**
         * Set property of items's value.
         */
        @Prop({ type: String, default: 'value' }) itemValue: string;

        /**
         * Hides the menu when there are no options to show. Useful for preventing the menu from
         * opening before results are fetched asynchronously. Also has the effect of opening the
         * menu when the items array changes if not already open.
         */
        @Prop({ type: Boolean, default: false }) hideNoData: boolean;

        /**
         * Displays linear progress bar.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Changes select to multiple. Accepts array for value.
         */
        @Prop({ type: Boolean, default: false }) multiple: boolean;

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        @Prop({ type: Boolean, default: true }) returnObject: boolean;

        /**
         * Changes display of selections to chips
         */
        @Prop({ type: Boolean, default: false }) chips: boolean;

        /**
         * Keeps a local unique copy of all items that have been passed through the items prop.
         */
        @Prop({ type: Boolean, default: false }) cacheItems: boolean;

        /**
         * Custom filter function.
         */
        @Prop({ type: Function, default: null }) filter: Function | null;

        /**
         * Perform local search.
         */
        @Prop({ type: Boolean, default: false }) local: boolean;

        /**
         * Will not automatically query the server when mounted.
         */
        @Prop({ type: Boolean, default: false }) lazy: string;

        _items: Array<any> = [];

        _loading: boolean = false;

        searchQuery: string = '';

        timeout: NodeJS.Timeout | null = null;

        /**
         * Override this method in order to define what to do when querying the search.
         */
        remoteSearch() {}

        /**
         * Handle the search.
         */
        handleSearch(): void
        {
            // Don't perform the search if we already retrieved the items from the server.
            if ((this.local && this.$data._items.length) || this.disabled) {
                return;
            }

            this.$data._loading = true;

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.remoteSearch();
            }, 250);
        }

        /**
         * Remove an item from the selection.
         */
        remove(item: any): void
        {
            let selected = [...this.value]
                .filter((current: any) => current[this.itemValue] !== item[this.itemValue]);

            this.$emit('input', selected);
        }

        /**
         * Stop the propagation of the enter keypress event.
         *
         * This is needed in order to avoid accidentally submitting the form containing this input
         * element.
         */
        stopEnterPropagation(event: any): void
        {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }

        @Watch('searchQuery', { immediate: true })
        onSearchQueryChange()
        {
            if (this.lazy) {
                return;
            }

            this.handleSearch();
        }

        @Watch('disabled', { immediate: true })
        onDisabledChange()
        {
            if (this.disabled) {
                return;
            }

            this.handleSearch();
        }
    }

    export default Autocomplete;

</script>
