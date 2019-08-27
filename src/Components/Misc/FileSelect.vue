<template>
    <v-layout wrap>
        <v-flex sm12 md6 v-if="$vuetify.breakpoint.mdAndUp"></v-flex>
        <v-flex sm12 md6>
            <v-text-field solo :placeholder="$t('common.search') + '...'" prepend-icon="search"
                          v-model="searchText">
            </v-text-field>
        </v-flex>
        <v-flex xs12>
            <slot :files="files" :pagination="pagination" :update-pagination="updatePagination"
                  :loading="loading" :selected="selected" :toggle-file="toggleFile">
            </slot>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">

    import { Component, Prop, Watch, Vue }       from 'vue-property-decorator';
    import { Pagination }                        from '../../Library/Utils/Pagination';
    import { Pagination as PaginationInterface } from '../../Library/Interfaces/Pagination';

    let timeout: any = null;

    @Component
    export class FileSelect extends Vue
    {
        /**
         * API Endpoint (relative to the base URL) that will be used in order to retrieve the
         * files.
         *
         * Example: $api.files
         */
        @Prop({ type: Object, required: true }) getEndpoint: any;

        selected: Array<any> = [];

        searchText: string = '';

        loading: boolean = false;

        files: Array<any> = [];

        pagination: PaginationInterface = {} as PaginationInterface;

        get _getEndpoint(): any
        {
            let parameters = Pagination.makeQueryParamsFromPagination(this.pagination);

            if (this.searchText.length) {
                parameters.search = this.searchText;
            }

            return this.getEndpoint
                .setParameters(parameters)
                .get();
        }

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
        }

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
        }

        /**
         * Toggle file selection.
         *
         * @param file {Object}
         */
        toggleFile(file: any): void
        {
            let foundFile = this.selected.find(current => current.id === file.id);

            if (foundFile) {
                this.selected.splice(this.selected.indexOf(foundFile), 1);
            } else {
                this.selected.push(file);
            }
        }

        /**
         * Update the pagination.
         *
         * @param pagination
         */
        updatePagination(pagination: any): void
        {
            this.pagination = pagination;
            this.getFiles();
        }

        mounted(): void
        {
            this.getFiles();
        }

        @Watch('searchText')
        onSearchTextChanged(): void
        {
            this.search();
        }
    }

    export default FileSelect;

</script>
