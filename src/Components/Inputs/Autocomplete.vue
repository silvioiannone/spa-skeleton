<script lang="ts">

    import { CreateElement, VNode }    from 'vue';
    import { ScopedSlot }              from 'vue/types/vnode';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Config }                  from '../../Config';
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
        @Prop({ type: Function }) search: ((query: string) => Promise<any>) | undefined;

        /**
         * Set property of items's value.
         */
        @Prop({ type: String, default: 'id'}) itemValue: string;

        get _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        }

        get _label(): string
        {
            return this.$utils.string.capitalize(this.label);
        }

        /**
         * Perform the search serverside.
         */
        _search(): void
        {
            this.$data._loading = true;

            let search = this.search || this.defaultSearch;

            search(this.searchQuery)
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
         * Default (local) search function.
         */
        defaultSearch(query: string): Promise<void>
        {
            return new Promise<any>((resolve) => { resolve([]) });
        }

        /**
         * Handle the `change` event fired by the `v-autocomplete` component.
         */
        handleChangeEvent(value: any): void
        {
            this.searchQuery = '';
            this.$emit('change', value);
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
         * Default filter functionality.
         */
        defaultFilter(item: any, queryText: string, itemText: string): boolean {
            const text = item[this.itemText].toLowerCase();
            const searchText = queryText.toLowerCase();

            return text.indexOf(searchText) > -1;
        }

        /**
         * Render the component.
         */
        render(createElement: CreateElement): VNode
        {
            let scopedSlots: { [key: string]: ScopedSlot | undefined } = {};

            // If there are scoped slots...
            if (this.$vnode?.data?.scopedSlots) {
                scopedSlots = this.$vnode.data.scopedSlots;

                // We add a remove function to the scoped slots so that it can be accessed from
                // within the selection scoped slot.
                if (scopedSlots.selection) {
                    scopedSlots.selection = (props: any) => {
                        props.remove = this.remove;
                        return (<any>(scopedSlots.selection))(props);
                    }
                }
            }

            let items = [...this.items, ...this.$data._items];

            if (this.multiple) {
                items.concat(this.value);
            } else {
                items.push(this.value);
            }

            // We only pick the truty items with the `itemValue` key set.
            items = items.filter((item: any) => !! item && item[this.itemValue]);

            let autocompleteProps = {
                ...this.$props,
                label: this._label,
                value: this.value,
                items,
                loading: this.$data._loading,
                searchInput: this.searchQuery,
                outlined: this._outlined
            };

            // The rules are only passed to the `validation-provider` component.
            delete autocompleteProps['rules'];

            if (this.local) {
                autocompleteProps['filter'] = this.filter || this.defaultFilter;
            } else {
                // If we're making a remote search (fetch the items from the server) we need to
                // cache the items (using the `cache-items` prop) because otherwise, after
                // performing the search, the items will be a subset of the original items causing
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

            return createElement('validation-provider', {
                props: {
                    rules: this.rules,
                    name: this.name,
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
