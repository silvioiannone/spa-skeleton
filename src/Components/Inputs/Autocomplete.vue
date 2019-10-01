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

            items = this.multiple ? [...items, ...this.value] : [...items, this.value];

            if (selected && this.multiple) {
                // Check if selected is array
                items = items.concat(selected);
            }

            items = items.filter((item: any) => !! item);

            let autocompleteProps = {
                ...this.$props,
                value: selected,
                items,
                loading: this.$data._loading,
                returnObject: true,
                outlined: this._outlined
            };

            // The rules are only passed to the `validation-provider` component.
            delete autocompleteProps['rules'];

            if (this.local) {
                if (this.filter) {
                    autocompleteProps['filter'] = this.filter;
                }
            } else {
                autocompleteProps['noFilter'] = true;
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
                                input: (value: any) => this.emitInput(value),
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
