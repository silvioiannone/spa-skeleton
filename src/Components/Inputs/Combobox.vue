<script lang="ts">

import { CreateElement, VNode } from 'vue';
import Combobox from '../Mixins/Combobox.vue';
import MixinComponent from '../Mixins/Component.vue';

export default {

    name: 'InputCombobox',

    mixins: [Combobox, MixinComponent],

    props: {
        /**
         * A search function that returns a promise.
         *
         * The promise should resolve with the items displayed by the dropdown.
         */
        search: { type: Function }
    },

    computed: {
        computedProps()
        {
            return {
                items: this.$data._items,
                loading: this.$data._loading
            }
        }
    },

    methods: {
        /**
         * Perform the search.
         */
        async internalSearch(): Promise<any>
        {
            this.$data._loading = true;

            let result = [];

            try {
                result = await this.search(this.searchQuery);
            } catch (error) {
                this.$data._loading = false;
            }

            if (! Array.isArray(result)) {
                throw 'The return value of the `search` function must be an Array.';
            }

            this.$data._items = result;
            this.$data._loading = false;
        },

        /**
         * Handle the 'update:searchInput' event.
         */
        handleUpdateSearchInput(value: string)
        {
            this.searchQuery = value;
        }
    },

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

            if (initialScopedSlots['no-data']) {
                scopedSlots['no-data'] = initialScopedSlots['no-data'];
            }
        }

        return createElement(
            'v-combobox',
            {
                ref: 'combobox',
                attrs: {
                    name: this.name
                },
                props: {
                    items: this.$data._items,
                    loading: this.$data._loading,
                    ...this.$props,
                },
                on: {
                    input: this.handleInput,
                    change: this.handleChange,
                    'update:search-input': this.handleUpdateSearchInput
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
