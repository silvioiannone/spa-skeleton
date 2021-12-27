<script lang="ts">

import TextField from './TextField.vue';

/**
 * This mixin can be used to build autocomplete inputs.
 *
 * Override the search function and use it to retrieve some data from the server.
 */
export default {

    mixins: [TextField],

    props: {
        /**
         * Model.
         */
        value: {},

        /**
         * Can be an array of objects or array of strings. When using objects, will look for a
         * text and value field. This can be changed using the item-text and item-value props.
         */
        items: { type: Array, default: () => ([]) },

        /**
         * Set property of items's text value
         */
        itemText: { type: String, default: 'text' },

        /**
         * Set property of items's value.
         */
        itemValue: { type: String, default: 'value' },

        /**
         * Hides the menu when there are no options to show. Useful for preventing the menu from
         * opening before results are fetched asynchronously. Also has the effect of opening the
         * menu when the items array changes if not already open.
         */
        hideNoData: { type: Boolean, default: false },

        /**
         * Display text when there is no data.
         */
        noDataText: { type: String, default: '$vuetify.noDataText' },

        /**
         * Displays linear progress bar.
         */
        loading: { type: Boolean, default: false },

        /**
         * Changes select to multiple. Accepts array for value.
         */
        multiple: { type: Boolean, default: false },

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        returnObject: { type: Boolean, default: true },

        /**
         * Changes display of selections to chips
         */
        chips: { type: Boolean, default: false },

        /**
         * Keeps a local unique copy of all items that have been passed through the items prop.
         */
        cacheItems: { type: Boolean, default: false },

        /**
         * Custom filter function.
         */
        filter: { type: Function, default: null },

        /**
         * Perform local search.
         */
        local: { type: Boolean, default: false },

        /**
         * Will not automatically query the server when mounted.
         */
        lazy: { type: Boolean, default: false }
    },

    data()
    {
        return {
            _items: [],
            _loading: false,
            searchQuery: '',
            timeout: null as NodeJS.Timeout | null,
        }
    },

    methods: {
        /**
         * Override this method in order to define what to do when querying the search.
         */
        remoteSearch() {},

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
        },

        /**
         * Remove an item from the selection.
         */
        remove(item: any): void
        {
            let selected = [...this.value]
                .filter((current: any) => current[this.itemValue] !== item[this.itemValue]);

            this.$emit('input', selected);
        },

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
    },

    created(): void
    {
        this.$watch('searchQuery', () => {
            if (this.lazy) {
                return;
            }

            this.handleSearch();
        }, { immediate: true });

        this.$watch('disabled', () => {
            if (this.disabled) {
                return;
            }

            this.handleSearch();
        }, { immediate: true });
    }
}

</script>
