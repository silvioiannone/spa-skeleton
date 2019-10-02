<script lang="ts">

    import { Config }                  from '../../Config';
    import { CreateElement, VNode }    from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Autocomplete }            from '../Mixins/Autocomplete.vue';
    import { Validatable }             from '../Mixins/Components/Validatable.vue';

    @Component
    export class InputAutocomplete extends Mixins(Autocomplete, Validatable)
    {
        /**
         * A search function that returns a promise.
         *
         * The promise should resolve with the items displayed by the dropdown.
         */
        @Prop({ type: Function, required: true }) search: (query: string) => Promise<any>;

        /**
         * Set property of items's value.
         */
        @Prop({ type: String, default: 'id'}) itemValue: string;

        get _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        }

        /**
         * Perform the search serverside.
         */
        _search(): void
        {
            this.$data._loading = true;

            this.search(this.searchQuery)
                .then((result: Array<any>) => {
                    if (! Array.isArray(result)) {
                        throw 'The return value of the `search` function must be an Array.';
                    }

                    this.$data._items = result;
                    this.$data._loading = false;
                })
                .catch(() => this.$data._loading = false );
        }

        /**
         * Handle the `change` event fired by the `v-autocomplete` component.
         */
        handleChangeEvent(value: any): void
        {
            this.searchQuery = '';
        }

        /**
         * Handle the `input` event fired by the `v-autocomplete` component.
         */
        handleInputEvent(value: any): void
        {
            this.$emit('input', value);
        }

        /**
         * Handle the `update:searchInput` event fired by the `v-autocomplete` component.
         */
        handleUpdateSearchInput(value: any): void
        {
            this.searchQuery = value;
        }

        /**
         * Handle the `update:error` event fired by the `v-autocomplete` component.
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

            let items = [...this.items, ...this.$data._items]
                .filter((item: any) => !! item);

            let autocompleteProps = {
                ...this.$props,
                value: this.value,
                items,
                loading: this.$data._loading,
                returnObject: true,
                searchInput: this.searchQuery,
                outlined: this._outlined
            };

            // The rules are only passed to the `validation-provider` component.
            delete autocompleteProps['rules'];

            if (this.local) {
                if (this.filter) {
                    autocompleteProps['filter'] = this.filter;
                }
            } else {
                if (this.multiple) {
                    // If we're making a remote search (fetch the items from the server) we need to
                    // cache the items (using the `cache-items` prop) because otherwise, after
                    // performing a search, the items will be a subset of the original items causing
                    // the already selected items to disappear since those are probably not in the
                    // search result.
                    autocompleteProps['cacheItems'] = true;

                    // This unfortunately cause another issue. The cached items, even if not
                    // present in the search result, are displayed by the dropdown. This requires
                    // for a custom filter function to be applied. This function will only display
                    // the cached items that are also present in the search result (`items`).
                    autocompleteProps['filter'] =
                        (currentItem: any, queryText: string, itemText: string): boolean =>
                            !! items.find((item: any): boolean =>
                                item[this.itemValue] === currentItem[this.itemValue]
                        );
                }
            }

            return createElement('validation-provider', {
                props: {
                    rules: this.rules,
                    name: this._validationName,
                    vid: this.name
                },
                scopedSlots: {
                    default: (props: { errors: any }): VNode => createElement(
                        'v-autocomplete',
                        {
                            ref: 'autocomplete',
                            attrs: {
                                name: this.name
                            },
                            props: {
                                ...autocompleteProps,
                                errorMessages: props.errors
                            },
                            on: {
                                ...this.$listeners,
                                'input': this.handleInputEvent,
                                'change': this.handleChangeEvent,
                                'update:search-input': this.handleUpdateSearchInput,
                                'update:error': this.handleUpdateError
                            },
                            nativeOn: {
                                keydown: this.stopEnterPropagation
                            },
                            scopedSlots
                        }
                    )
                }
            });
        }
    }

    export default InputAutocomplete;

</script>
