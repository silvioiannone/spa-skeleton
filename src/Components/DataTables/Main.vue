<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { Config }               from '../../Config';

    @Component
    export class DataTableMain extends Vue
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
         * Pagination object,
         */
        @Prop({ type: Object, default: () => ({}) }) pagination: any

        /**
         * Shows the select checkboxes in both the header and rows (if using default rows).
         */
        @Prop({ type: Boolean, default: false }) showSelect: boolean;

        /**
         * Used for controlling selected rows
         */
        @Prop({ type: Array, default: () => []}) value: Array<any>;

        /**
         * Get the `itemsPerPageOptions` table footer prop.
         */
        get itemsPerPageOptions(): Array<number>
        {
            let paginationSize = Config.app.paginationSize;

            return [paginationSize, paginationSize * 2, paginationSize * 4];
        }

        /**
         * Update the pagination from the value of the table's options prop.
         */
        updatePagination(value: any): void
        {
            let pagination = {
                ...this.pagination,
                rowsPerPage: value.itemsPerPage,
                page: value.page,
            }

            pagination['sortBy'] = value.sortBy.length ? value.sortBy[0] : '';
            pagination['descending'] = value.sortDesc.length ? value.sortDesc[0] : null;

            this.$emit('update:pagination', pagination)
        }

        render(createElement: Function)
        {
            let component = {
                props: {
                    headers: this.headers,
                    items: this.items,
                    serverItemsLength: this.pagination.totalItems,
                    itemsPerPage: this.pagination.rowsPerPage,
                    page: this.pagination.page,
                    sortBy: this.pagination.sortBy,
                    sortDesc: this.pagination.descending,
                    showSelect: this.showSelect,
                    footerProps: {
                        itemsPerPageOptions: this.itemsPerPageOptions
                    },
                    value: this.value,
                },
                on: {
                    'input': (value: any) => this.$emit('input', value),
                    'update:options': (value: any) => {
                        this.updatePagination(value);
                    },
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
