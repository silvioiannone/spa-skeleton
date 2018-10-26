<script>

    import TextField from 'spa-skeleton/src/Components/Mixins/TextField';

    /**
     * This mixin can be used to build autocomplete inputs.
     *
     * Override the search function and use it to retrieve some data from the server.
     *
     * Use `$data._search` as the search string.
     */
    export default {

        name: 'Autocomplete',

        mixins: [
            TextField
        ],

        props: {

            /**
             * Model.
             */
            value: {},

            /**
             * Can be an array of objects or array of strings. When using objects, will look for a
             * text and value field. This can be changed using the item-text and item-value props.
             */
            items: {
                type: Array,
                default: () => []
            },

            /**
             * Set property of items's text value
             */
            itemText: {
                type: String,
                default: ''
            },

            /**
             * Set property of items's value.
             */
            itemValue: {
                type: String,
                default: ''
            },

            /**
             * Hides the menu when there are no options to show. Useful for preventing the menu from
             * opening before results are fetched asynchronously. Also has the effect of opening the
             * menu when the items array changes if not already open.
             */
            hideNoData: {
                type: Boolean,
                default: false
            },

            /**
             * Displays linear progress bar.
             */
            loading: {
                type: Boolean,
                default: false
            },

            /**
             * Changes select to multiple. Accepts array for value.
             */
            multiple: {
                type: Boolean,
                default: false
            },

            /**
             * Changes the selection behavior to return the object directly rather than the value
             * specified with item-value.
             */
            returnObject: {
                type: Boolean,
                default: false
            },

            /**
             * Changes display of selections to chips
             */
            chips: {
                type: Boolean,
                default: false
            },

            /**
             * Keeps a local unique copy of all items that have been passed through the items prop.
             */
            cacheItems: {
                type: Boolean,
                default: false
            }
        },

        data()
        {
            return {
                _selected: null,
                _items: [],
                _loading: false,
                searchQuery: '',
                timeout: null
            }
        },

        methods: {

            /**
             * Override this method in order to define what to do when querying the search.
             */
            _search() {},

            /**
             * Handle the search.
             */
            handleSearch()
            {
                // Don't perform the search if we already retrieved the items from the server.
                if (this.local && this.$data._items.length) {
                    return;
                }

                this.$data._loading = true;

                if (this.timeout) {
                    clearTimeout(this.timeout);
                }

                this.timeout = setTimeout(() =>
                {
                    this._search();
                }, 250);
            },

            /**
             * Stop the propagation of the enter keypress event.
             *
             * This is needed in order to avoid accidentally submitting the form containing this
             * input element.
             *
             * @param event
             */
            stopEnterPropagation(event)
            {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            },

            /**
             * Remove an item from the selection.
             *
             * @param item
             */
            remove(item)
            {
                let match = this.$data._selected.find(current => current.id === item.id);

                if (match) {
                    let index = this.$data._selected.indexOf(match);
                    this.$data._selected.splice(index, 1);
                    this.$emit('input', this.$data._selected);
                }
            },

            /**
             * Emit the input event.
             *
             * @param value
             */
            emitInput(value)
            {
                this.$data._selected = value;
                this.$emit('input', value);
            }
        },

        watch: {

            searchQuery: {
                handler: function()
                {
                    this.handleSearch();
                },
                immediate: true
            },

            value: {
                handler: function()
                {
                    this.$data._selected = this.value;
                },
                immediate: true
            }
        }
    }

</script>
