<script lang="ts">

import 'vuetify/src/components/VDataTable/VDataTable.sass';
import 'vuetify/src/components/VDataTable/VDataTableHeader.sass';
import 'vuetify/src/components/VDataTable/VEditDialog.sass';
import 'vuetify/src/components/VDataTable/VSimpleTable.sass';
import 'vuetify/src/components/VDataTable/VVirtualTable.sass';
import 'vuetify/src/components/VDataIterator/VDataFooter.sass';

import { Config } from '../../Config';
import BasePaginatable from '../Mixins/Pagination.vue';

export default {

    name: 'DataTableMain',

    mixins: [BasePaginatable],

    props: {
        /**
         * Function used to sort items.
         */
        customSort: Function,

        /**
         * Disables pagination completely.
         */
        disablePagination: { type: Boolean, default: false },

        /**
         * Array of expanded items. Can be used with `.sync` modifier.
         */
        expanded: { type: Array, default: () => ([]) },

        /**
         * Table headers.
         */
        headers: { type: Array, default: () => ([]) },

        /**
         * Hides default footer.
         */
        hideDefaultFooter: { type: Boolean, default: false },

        /**
         * Items displayed by the table.
         */
        items: { type: Array, default: () => ([]) },

        /**
         * If true and no items are provided, then a loading text will be shown.
         */
        loading: { type: Boolean, default: false },

        /**
         * Shows the select checkboxes in both the header and rows (if using default rows).
         */
        showSelect: { type: Boolean, default: false },

        /**
         * Shows the expand toggle in default rows.
         */
        showExpand: { type: Boolean, default: false },

        /**
         * Used for controlling selected rows.
         */
        value: { type: Array, default: () => ([]) }
    },

    computed: {
        /**
         * Get the `itemsPerPageOptions` table footer prop.
         */
        itemsPerPageOptions(): Array<number>
        {
            let paginationSize = Config.app.paginationSize;

            return [paginationSize, paginationSize * 2, paginationSize * 4];
        },

        props(): any
        {
            let props = {
                ...this.$props,
                footerProps: {
                    itemsPerPageOptions: this.itemsPerPageOptions
                },
                headers: this._headers
            };

            if (! this.hasCustomSort()) {
                props = {
                    ...props,
                    ...this.getVuePaginationProps(this.pagination),
                    serverItemsLength: this._serverItemLength
                }
            }

            return props;
        },

        _headers(): any[]
        {
            return this.headers.map((header: any): any => {
                if (header.text) {
                    header.text = this.$options?.filters?.capitalize(header.text);
                }

                return header;
            });
        },

        _serverItemLength(): number
        {
            return this.getVuePaginationProps(this.pagination).serverItemsLength
                || this.items.length;
        }
    },

    methods: {

        /**
         * Whether a custom sort is defined.
         */
        hasCustomSort(): boolean
        {
            if (this.customSort) {
                return true;
            }

            if (this.headers.find((header: any) => header.sort)) {
                return true;
            }

            return false;
        },

        /**
         * Select an item.
         */
        select(item: any): void
        {
            let selected = [...this.value];

            let position = selected.indexOf(item);

            if(position >= 0) {
                delete selected[position];
            } else {
                selected.push(item);
            }

            this.$emit('input', selected);
        }
    },

    /**
     * Render the element.
     */
    render(createElement: Function)
    {
        let component = {
            props: this.props,
            on: {
                ...this.$listeners,
                'input': (value: any): this => this.$emit('input', value),
                'click:row': (value: any): this => this.$emit('click', value),
                'update:options': (value: any): void => this.updatePagination(value)
            },
            scopedSlots: {}
        };

        if (this.$vnode.data?.scopedSlots) {
            component.scopedSlots = this.$vnode.data.scopedSlots;

            component.scopedSlots['item'] = (scopeProps: any) => {
                scopeProps.select = this.select;
                return (this.$vnode.data?.scopedSlots?.item as any)(scopeProps);
            }
        }

        return createElement('v-data-table', component);
    }
}

</script>
