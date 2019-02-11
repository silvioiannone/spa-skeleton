<script lang="ts">

    import Config              from '../../Config';
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class DataTableMain extends Vue
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
         * Adds header row select all checkbox. Can either be a String which specifies which color
         * is applied to the button, or a Boolean (which uses the default color).
         */
        @Prop({ type: [Boolean, String], default: false }) selectAll: boolean | string;

        rowsPerPageItems()
        {
            let paginationSize = Config.app.paginationSize;

            return [paginationSize, paginationSize * 2, paginationSize * 4];
        }

        render(createElement: Function)
        {
            let component = {
                props: {
                    headers: this.headers,
                    items: this.items,
                    pagination: this.pagination,
                    totalItems: this.pagination.totalItems,
                    rowsPerPageItems: this.rowsPerPageItems(),
                    selectAll: this.selectAll
                },
                on: {
                    'input': (value: any) => this.$emit('input', value),
                    'update:pagination': (value: any) => this.$emit('update:pagination', value),
                }
            };

            if (this.$vnode.data) {
                component['scopedSlots'] = this.$vnode.data.scopedSlots;
            }

            return createElement('v-data-table', component);
        }
    }

</script>
