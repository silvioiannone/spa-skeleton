<template>
    <v-layout wrap>
        <v-flex sm12 md6 v-if="$vuetify.breakpoint.mdAndUp"></v-flex>
        <v-flex sm12 md6>
            <v-text-field solo placeholder="Search..." prepend-icon="search" v-model="searchText">
            </v-text-field>
        </v-flex>
        <v-flex xs12>
            <slot :files="files" :pagination="pagination" :update-pagination="updatePagination"
                :loading="loading" :selected="selected" :toggle-file="toggleFile">
            </slot>
        </v-flex>
    </v-layout>
</template>

<script>

    import Pagination from 'spa-skeleton/src/Library/Utils/Pagination';

    let timeout = null;

    export default {

        name: 'FileSelect',

        props: {

            /**
             * API Endpoint (relative to the base URL) that will be used in order to retrieve the
             * files.
             *
             * Example: $api.files
             */
            getEndpoint: {
                type: Object,
                default: null
            }
        },

        data()
        {
            return {
                selected: [],
                searchText: '',
                loading: false,
                files: [],
                pagination: {
                    sortBy: null
                }
            }
        },

        computed: {

            _getEndpoint()
            {
                let apiEndpoint = this.getEndpoint || this.$api.files;
                let parameters = Pagination.makeQueryParamsFromVuetifyPagination(this.pagination);

                if (this.searchText.length) {
                    parameters.search = this.searchText;
                }

                return apiEndpoint
                    .setParameters(parameters)
                    .get();
            }
        },

        methods: {

            /**
             * Get the files.
             */
            getFiles()
            {
                this.loading = true;

                this._getEndpoint
                    .then(response =>
                    {
                        this.loading = false;

                        this.files = response.body.data;
                        this.pagination = Pagination.makeFromResponse(response);
                    });
            },

            /**
             * Perform the search.
             */
            search()
            {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() =>
                {
                    this.getFiles();
                }, 500);
            },

            /**
             * Toggle file selection.
             *
             * @param file {Object}
             */
            toggleFile(file)
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
             *
             * @param pagination
             */
            updatePagination(pagination)
            {
                this.pagination = pagination;
                this.getFiles();
            }
        },

        mounted()
        {
            this.getFiles();
        },

        watch: {

            searchText: 'search'
        }
    }

</script>
