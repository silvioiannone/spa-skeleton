<template>
    <v-pagination :length="pagination.last_page" :value="pagination.page" :total-visible="7"
                  @input="handleInput"/>
</template>

<script lang="ts">

import { Pagination } from '../../Library/Interfaces/Pagination';

export default {

    name: 'PaginationMain',

    props: {
        /**
         * Pagination object.
         */
        pagination: {type: Object, required: true} as Pagination
    },

    methods: {

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
}

</script>
