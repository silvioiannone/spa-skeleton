<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class BasePaginatable extends Vue
    {
        /**
         * Pagination object,
         */
        @Prop({ type: Object, default: () => ({}) }) pagination: any

        /**
         * Update the pagination from the value of the table's options prop.
         */
        updatePagination(value: any): void
        {
            let pagination = {
                per_page: value.itemsPerPage,
                page: value.page,
                sort: ''
            }

            let sortBy = ([...value.sortBy]);
            if (sortBy.length) {
                let sort = '';
                let descending = [...value.sortDesc][0];

                if (descending) {
                    sort = '-';
                }

                sort += sortBy;
                pagination['sort'] = sort;
            }

            this.$emit('update:pagination', pagination)
        }

        /**
         * Get the Vue compatible pagination props from a pagination object.
         */
        getVuePagination(pagination: any): any
        {
            if (! pagination) {
                return undefined;
            }

            let vuePagination = {
                serverItemsLength: pagination.total,
                itemsPerPage: pagination.per_page,
                page: pagination.page
            }

            let sort = pagination.sort;

            if (sort && sort.length) {
                let descending = false;

                if (sort.charAt(0) === '-') {
                    descending = true;
                    sort = sort.slice(1, sort.length)
                }

                vuePagination['sortBy'] = sort;
                vuePagination['sortDesc'] = descending;
            }

            return vuePagination;
        }
    }

    export default BasePaginatable;

</script>
