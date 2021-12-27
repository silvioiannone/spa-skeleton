<template>
    <v-row>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" sm="12" md="6"/>
        <v-col sm="12" md="6">
            <v-text-field solo :placeholder="$t('common.search') + '...'" prepend-icon="search"
                          v-model="searchText"/>
        </v-col>
        <v-col cols="12">
            <slot :files="files" :pagination="pagination" :update-pagination="updatePagination"
                  :loading="loading" :selected="selected" :toggle-file="toggleFile"/>
        </v-col>
    </v-row>
</template>

<script lang="ts">

import { Pagination } from '../../Library/Utils/Pagination';
import { Pagination as PaginationInterface } from '../../Library/Interfaces/Pagination';

let timeout: any = null;

export default {

    name: 'FileSelect',

    props: {
        /**
         * API Endpoint (relative to the base URL) that will be used in order to retrieve the
         * files.
         *
         * Example: $api.files
         */
        getEndpoint: { type: Object, required: true }
    },

    data()
    {
        return {
            selected: [],
            searchText: '',
            loading: false,
            files: [],
            pagination: {} as PaginationInterface
        }
    },

    computed: {
        internalGetEndpoint(): any
        {
            let parameters = Pagination.makeQueryParamsFromPagination(this.pagination);

            if (this.searchText.length) {
                parameters.search = this.searchText;
            }

            return this.getEndpoint
                .setParameters(parameters)
                .get();
        }
    },

    methods: {
        /**
         * Get the files.
         */
        getFiles(): void
        {
            this.loading = true;

            this._getEndpoint
                .then((response: any) => {
                    this.loading = false;

                    this.files = response.body.data;
                    this.pagination = Pagination.makeFromResponse(response);
                });
        },

        /**
         * Perform the search.
         */
        search(): void
        {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                this.getFiles();
            }, 500);
        },

        /**
         * Toggle file selection.
         */
        toggleFile(file: any): void
        {
            let foundFile = this.selected.find(current => current.id === file.id);

            if (foundFile) {
                this.selected.splice(this.selected.indexOf(foundFile), 1);
            } else {
                this.selected.push(file);
            }
        },

        /**
         * Update the pagination.
         */
        updatePagination(pagination: any): void
        {
            this.pagination = pagination;
            this.getFiles();
        }
    },

    mounted(): void
    {
        this.getFiles();
    },

    watch: {

        searchText(): void
        {
            this.search();
        }
    }
}

</script>
