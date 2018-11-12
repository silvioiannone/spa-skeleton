<template>
    <v-pagination :length="pagination.totalPages" v-model="page" :total-visible="7">
    </v-pagination>
</template>

<script>

    export default {

        name: 'PaginationMain',

        data()
        {
            return {
                page: 1
            }
        },

        props: {

            /**
             * Pagination object.
             */
            pagination: {
                type: Object,
                required: true
            }
        },

        watch: {

            pagination: {
                handler()
                {
                    this.page = this.pagination.page;
                },
                immediate: true,
                deep: true
            },

            page()
            {
                this.$emit('update:pagination', {
                    ...this.pagination,
                    page: this.page
                });
            }
        }
    }

</script>
