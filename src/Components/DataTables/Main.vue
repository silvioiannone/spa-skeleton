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
         * Table headers.
         */
        @Prop({ type: Array, default: () => [] }) headers: Array<any>

        /**
         * Items displayed by the table.
         */
        @Prop({ type: Array, default: () => [] }) items: Array<any>

        /**
         * Shows the select checkboxes in both the header and rows (if using default rows).
         */
        @Prop({ type: Boolean, default: false }) showSelect: boolean;

        /**
         * Used for controlling selected rows.
         */
        @Prop({ type: Array, default: () => []}) value: Array<any>;

        /**
         * Disables pagination completely.
         */
        @Prop({ type: Boolean, default: false }) disablePagination: boolean;

        /**
         * Hides default footer.
         */
        @Prop({ type: Boolean, default: false }) hideDefaultFooter: boolean;

        /**
         * Get the `itemsPerPageOptions` table footer prop.
         */
        get itemsPerPageOptions(): Array<number>
        {
            let paginationSize = Config.app.paginationSize;

            return [paginationSize, paginationSize * 2, paginationSize * 4];
        }

        render(createElement: Function)
        {
            let component = {
                props: {
                    ...this.$props,
                    footerProps: {
                        itemsPerPageOptions: this.itemsPerPageOptions
                    },
                    ...this.getVuePagination(this.pagination)
                },
                on: {
                    ...this.$listeners,
                    'input': (value: any): this => this.$emit('input', value),
                    'update:options': (value: any): void => this.updatePagination(value)
                }
            };

            if (this.$vnode.data) {
                component['scopedSlots'] = this.$vnode.data.scopedSlots;
            }

            return createElement('v-data-table', component);
        }
    }

    export default DataTableMain;

</script>
