<script lang="ts">

    import '../../../../vuetify/src/components/VDataTable/VDataTable.sass'
    import '../../../../vuetify/src/components/VDataTable/VDataTableHeader.sass'
    import '../../../../vuetify/src/components/VDataTable/VEditDialog.sass'
    import '../../../../vuetify/src/components/VDataTable/VSimpleTable.sass'
    import '../../../../vuetify/src/components/VDataTable/VVirtualTable.sass'
    import '../../../../vuetify/src/components/VDataIterator/VDataFooter.sass'

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Config }                  from '../../Config';
    import { BasePaginatable }         from '../Mixins/Pagination.vue';

    @Component
    export class DataTableMain extends Mixins(BasePaginatable)
    {
        /**
         * Disables pagination completely.
         */
        @Prop({ type: Boolean, default: false }) disablePagination: boolean;

        /**
         * Array of expanded items. Can be used with `.sync` modifier.
         */
        @Prop({ type: Array, default: () => [] }) expanded: any[];

        /**
         * Table headers.
         */
        @Prop({ type: Array, default: () => [] }) headers: any[];

        /**
         * Hides default footer.
         */
        @Prop({ type: Boolean, default: false }) hideDefaultFooter: boolean;

        /**
         * Items displayed by the table.
         */
        @Prop({ type: Array, default: () => [] }) items: any[];

        /**
         * If true and no items are provided, then a loading text will be shown.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Shows the select checkboxes in both the header and rows (if using default rows).
         */
        @Prop({ type: Boolean, default: false }) showSelect: boolean;

        /**
         * Shows the expand toggle in default rows.
         */
        @Prop({ type: Boolean, default: false }) showExpand: boolean;

        /**
         * Used for controlling selected rows.
         */
        @Prop({ type: Array, default: () => []}) value: any[];

        /**
         * Get the `itemsPerPageOptions` table footer prop.
         */
        get itemsPerPageOptions(): Array<number>
        {
            let paginationSize = Config.app.paginationSize;

            return [paginationSize, paginationSize * 2, paginationSize * 4];
        }

        /**
         * Render the element.
         */
        render(createElement: Function)
        {
            let component = {
                props: {
                    ...this.$props,
                    footerProps: {
                        itemsPerPageOptions: this.itemsPerPageOptions
                    },
                    headers: this._headers,
                    ...this.getVuePaginationProps(this.pagination),
                    // Override the `serverItemsLength` prop returned from the
                    // `getVuePaginationProps`.
                    serverItemsLength: this.getVuePaginationProps(this.pagination).serverItemsLength
                        || this.items.length,
                },
                on: {
                    ...this.$listeners,
                    'input': (value: any): this => this.$emit('input', value),
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

        get _headers(): any[]
        {
            return this.headers.map((header: any): any => {
                if (header.text) {
                    header.text = this.$options?.filters?.capitalize(header.text);
                }

                return header;
            });
        }

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
    }

    export default DataTableMain;

</script>
