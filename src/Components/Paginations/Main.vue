<template>
    <v-pagination :length="pagination.last_page" :value="pagination.page" :total-visible="7"
                  @input="handleInput"/>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Pagination } from '../../Library/Interfaces/Pagination';

    @Component
    export class PaginationMain extends Vue
    {
        /**
         * Pagination object.
         */
        @Prop({type: Object, required: true}) pagination: Pagination;

        /**
         * Handle the `input` event fired by the `v-pagination` component.
         */
        handleInput(value: any): void
        {
            this.$emit('update:pagination', {
                ...this.pagination,
                page: value
            });
        }
    }

    export default PaginationMain;

</script>
