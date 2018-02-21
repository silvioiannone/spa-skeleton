<script>

    import Config from 'spa-skeleton/src/Config';

    export default {

        name: 'DataTableMain',

        props: {

            /**
             * Table headers.
             */
            headers: {
                type: Array,
                default: () => []
            },

            /**
             * Items displayed by the table.
             */
            items: {
                type: Array,
                default: () => []
            },

            /**
             * Pagination object.
             */
            pagination: {
                type: Object,
                default: () => { return {} }
            }
        },

        methods: {

            rowsPerPageItems()
            {
                let paginationSize = Config.app.paginationSize;

                return [paginationSize, paginationSize * 2, paginationSize * 4];
            }
        },

        render(createElement)
        {
            let self = this;
            return createElement('v-data-table', {
                props: {
                    headers: this.headers,
                    items: this.items,
                    pagination: this.pagination,
                    totalItems: this.pagination.totalItems,
                    rowsPerPageItems: this.rowsPerPageItems(),
                },
                on: {
                    'update:pagination': value => this.$emit('update:pagination', value)
                },
                scopedSlots: this.$vnode.data.scopedSlots
            });
        }
    }

</script>
