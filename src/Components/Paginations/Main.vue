<template>
    <v-pagination :length="pagination.last_page" v-model="page" :total-visible="7"></v-pagination>
</template>

<script lang="ts">

    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

    @Component
    export class PaginationMain extends Vue
    {
        page = 1;

        /**
         * Pagination object.
         */
        @Prop({type: Object, required: true}) pagination: any;

        @Watch('pagination', {immediate: true, deep: true})
        onPaginationChange(): void
        {
            this.page = this.pagination.page;
        }

        @Watch('page')
        onPageChange(): void
        {
            this.$emit('update:pagination', {
                ...this.pagination,
                page: this.page
            });
        }
    }

    export default PaginationMain;

</script>
