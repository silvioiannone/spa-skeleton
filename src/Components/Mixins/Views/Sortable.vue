<script lang="ts">

export default {

    name: 'Sortable',

    data()
    {
        return {
            sort: null,
            descending: false
        }
    },

    methods: {
        /**
         * Toggle the descending sorting direction.
         */
        toggleDescending(): void
        {
            this.descending = ! this.descending;
        },

        /**
         * Update the route.
         */
        updateRoute(): void
        {
            let query = {
                ...this.$route.query,
                page: '1'
            };

            if (this.sort) {
                query['sort'] = (this.descending ? '-' : '') + this.sort;

                this.$store.commit('app/INSERT', {
                    ui: {
                        pagination: {
                            sort: this.sort,
                            descending: this.descending
                        }
                    }
                });
            } else {
                if (query.hasOwnProperty('sort')) {
                    delete query['sort'];

                    this.$store.commit('app/INSERT', {
                        ui: {
                            pagination: {
                                sort: null,
                                descending: false
                            }
                        }
                    });
                }
            }

            this.$navigator.push({ path: this.$route.path, query });
        }
    },

    created()
    {
        let sort = this.$route.query.sort as string;

        if (sort) {
            this.descending = sort.charAt(0) === '-';
            this.sort = this.descending ? sort.slice(1, sort.length) : sort;
        }
    },

    watch: {
        sort()
        {
            this.updateRoute();
        },

        descending()
        {
            this.updateRoute();
        }
    }
}

</script>
