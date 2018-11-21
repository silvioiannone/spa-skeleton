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

            /**
             * Whether filters are applied.
             *
             * @returns {boolean}
             */
            hasFilters()
            {
                return JSON.stringify(this.filters) !== this.initialFilters;
            },

            /**
             * Whether the value is an empty array.
             *
             * @param value
             * @returns {boolean}
             */
            isEmptyArray(value)
            {
                return Array.isArray(value) && value.length === 0;
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
                    let filterValue = this.$route.query[key].split(',');
                    
                    this.filters[key] = Array.isArray(this.filters[key]) ?
                        filterValue : filterValue[0];
                }
            }
        },

        watch: {

            filters: {
                handler()
                {
                    let query = {...this.$route.query};

                    for (let key in this.filters) {
                        let filterValue = this.filters[key];
                        let queryValue = query[key];
                        
                        // If a filter is in the query but not in the filters then we remove it.
                        if ((! filterValue || this.isEmptyArray(filterValue))) {
                            if (queryValue) {
                                delete query[key];
                            }
                            continue;
                        }

                        // If the filter is an array then we need to append it.
                        query[key] = queryValue && Array.isArray(filterValue) ?
                            filterValue.join(',') : filterValue;
                    }

                    this.$router.push({ path: this.$route.path, query });
                },
                deep: true
            }
        }
    }

</script>
