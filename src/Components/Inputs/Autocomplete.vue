<script lang="ts">

    import { CreateElement, VNode }    from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import Autocomplete                from '../Mixins/Autocomplete.vue';

    @Component
    export default class InputAutocomplete extends Mixins(Autocomplete)
    {
        /**
         * A search function that returns a promise.
         *
         * The promise should resolve with the items displayed by the dropdown.
         */
        @Prop({ type: Function, required: true }) search: (query: string) => Promise<any>

        /**
         * Set property of items's value.
         */
        @Prop({ type: String, default: 'id'}) itemValue: string;

        /**
         * Perform the search serverside.
         */
        _search(): void
        {
            this.$data._loading = true;

            this.search(this.searchQuery)
                .then((result: Array<any>) =>
                {
                    if (! Array.isArray(result)) {
                        throw 'The return value of the `search` function must be an Array.';
                    }

                    this.$data._items = result;

                    let autocomplete = <any>this.$refs.autocomplete;

                    // Add the selected items to the cached items so that they don't disappear.
                    result.forEach((item: any) =>
                    {
                        let found = autocomplete.cachedItems
                            .find((cached: any) => cached.id === item.id);

                        if (! found) {
                            autocomplete.cachedItems.push(item);
                        }
                    });

                    this.$data._loading = false;
                })
                .catch(() => this.$data._loading = false );
        }

        /**
         * We need to define a custom filter function because of an issue with Vuetify when not
         * using the item-text and item-value props. This way the dropdown menu will always be
         * displayed and the filtering performed server-side.
         */
        _filter(item: any, queryText: string, itemText: string): any
        {
            return this.$data._items.find((current: any) => item.id === current.id);
        }

        /**
         * Handle the 'update:searchInput' event.
         */
        handleUpdateSearchInput(value: any): void
        {
            this.searchQuery = value;

            // If the value is empty we need to remove the selected value.
            if (this.searchQuery === '')  {
                this.$data._selected = null;
                this.emitInput(null);
            }
        }

        /**
         * Handle the `update:error` event.
         */
        handleUpdateError(value: any): void
        {
            this.$emit('update:error', value);
        }

        /**
         * Render the component.
         */
        render(createElement: CreateElement): VNode
        {
            let scopedSlots = {};

            // If there are scoped slots...
            if (this.$vnode.data && this.$vnode.data.scopedSlots) {
                let initialScopedSlots = this.$vnode.data.scopedSlots;

                // We add a remove function to the scoped slots so that it can be accessed from
                // within the selection scoped slot.
                if (initialScopedSlots.selection) {
                    scopedSlots['selection'] = (props: any) =>
                    {
                        props.remove = this.remove;
                        return (<any>(initialScopedSlots.selection))(props);
                    }
                }

                if (initialScopedSlots.item) {
                    scopedSlots['item'] = initialScopedSlots.item;
                }
            }


            let selected = this.multiple ?
                (this.$data._selected || []) : this.$data._selected;
            let items = [...this.items, ...this.$data._items];

            if (selected && this.multiple) {
                // Check if selected is array
                items = items.concat(selected);
            }

            let props = {
                ...this.$props,
                value: selected,
                items: items,
                loading: this.$data._loading,
                returnObject: true,
                errorMessages: this._errorMessages
            };

            // Override the filter functionality only if we want to perform a server search.
            if (this.local) {
                if (this.filter) {
                    props['filter'] = this.filter;
                }
            } else {
                props['filter'] = this._filter;
            }

            return createElement(
                'v-autocomplete',
                {
                    ref: 'autocomplete',
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
                        input: (value: any) => this.emitInput(value),
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
