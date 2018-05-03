<script>

    /*
     * The purpose of this mixin is to facilitate the use of server-side filters.
     *
     * Usage: simply define the value of your filters in the `filters` data object. E.g.:
     *
     *     filters: {
     *         identity_verification_status: null
     *     }
     */
    export default {

        data()
        {
            return {
                filters: {}
            }
        },

        methods: {

            hasFilters()
            {
                return JSON.stringify(this.filters) !== this.initialFilters;
            }
        },

        created()
        {
            // Make a copy of the filters so that later on we can compare this copy with the actual
            // filters in order to know whether there are filters applied.
            this.initialFilters = JSON.stringify(this.filters);

            // Get the query parameters and if there's a parameter with the same name as the filter
            // then use it to initialize the filters.
            for (let key in this.$route.query)
            {
                if (this.filters.hasOwnProperty(key)) {
                    this.filters[key] = this.$route.query[key];
                }
            }
        },

        watch: {

            filters: {
                handler()
                {
                    let query = {...this.$route.query};

                    // If filters are set...
                    if (this.hasFilters()) {
                        // ...update the route query...
                        for (let key in this.filters) {
                            query[key] = this.filters[key];
                        }
                    } else {
                        // ...otherwise remove the query parameters related to the filters.
                        for (let key in this.filters) {
                            delete query[key];
                        }
                    }

                    this.$router.push({ path: this.$route.path, query });
                },
                deep: true
            }
        }
    }

</script>
