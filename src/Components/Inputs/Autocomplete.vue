<script>

    import Autocomplete from '../Mixins/Autocomplete';

    export default {

        name: 'InputAutocomplete',

        mixins: [
            Autocomplete
        ],

        props: {

            /**
             * A search function that returns a promise.
             *
             * The promise should resolve with the items displayed by the dropdown.
             */
            search: {
                type: Function,
                required: true
            },

            /**
             * Set property of items's value.
             */
            itemValue: {
                type: String,
                default: 'id'
            },

            /**
             * Perform local search.
             */
            local: {
                type: Boolean,
                default: false
            }
        },

        methods: {

            /**
             * Perform the search serverside.
             */
            _search()
            {
                this.$data._loading = true;

                this.search(this.searchQuery)
                    .then(result =>
                    {
                        this.$data._items = result;

                        // Add the selected items to the cached items so that they don't disappear.
                        result.forEach(item =>
                        {
                            let found = this.$children[0].cachedItems
                                .find(cached => cached.id === item.id);
                            if (! found) {
                                this.$children[0].cachedItems.push(item);
                            }
                        });

                        this.$data._loading = false;
                    })
                    .catch(result =>
                    {
                        this.$data._loading = false;
                    });
            },

            /**
             * We need to define a custom filter function because of an issue with Vuetify when not
             * using the item-text and item-value props. This way the dropdown menu will always be
             * displayed and the filtering performed server-side.
             */
            _filter(item, queryText, itemText) {
                return this.$data._items.find(current => item.id === current.id);
            },

            /**
             * Handle the 'update:searchInput' event.
             *
             * @param value
             */
            handleUpdateSearchInput(value)
            {
                this.searchQuery = value;

                // If the value is empty we need to remove the selected value.
                if (this.searchQuery === '')  {
                    this.$data._selected = null;
                }
            },

            /**
             * Handle the `update:error` event.
             * @param value
             */
            handleUpdateError(value)
            {
                this.$emit('update:error', value);
            }
        },

        render(createElement)
        {
            let vnodeScopeSlots = this.$vnode.data.scopedSlots;
            let scopedSlots = {};

            // We add a remove function to the scoped slots so that it can be accessed from
            // within the selection scoped slot.
            if (vnodeScopeSlots && vnodeScopeSlots.selection) {
                scopedSlots.selection = (props) =>
                {
                    props.remove = this.remove;
                    return this.$vnode.data.scopedSlots.selection(props);
                }
            }

            if (vnodeScopeSlots && vnodeScopeSlots.item) {
                scopedSlots.item = this.$vnode.data.scopedSlots.item;
            }

            let selected = this.multiple ? (this.$data._selected || []) : [this.$data._selected];

            let props = {
                ...this.$props,
                value: this.$data._selected,
                items: [...this.items, ...selected, ...this.$data._items],
                loading: this.$data._loading,
                returnObject: true,
                errorMessages: this._errorMessages
            };

            // Override the filter functionality only if we want to perform a server search.
            if (this.local) {
                if (this.filter) {
                    props.filter = this.filter;
                }
            } else {
                props.filter = this._filter;
            }

            return createElement(
                'v-autocomplete',
                {
                    attrs: {
                        name: this.name,
                        'data-vv-as': this.vvAs
                    },
                    props,
                    directives: [
                        {
                            name: 'validate',
                            value: this.validation
                        }
                    ],
                    on: {
                        input: value => this.emitInput(value),
                        'update:searchInput': this.handleUpdateSearchInput,
                        'update:error': this.handleUpdateError
                    },
                    nativeOn: {
                        keydown: this.stopEnterPropagation
                    },
                    scopedSlots
                }
            )
        }
    }

</script>
