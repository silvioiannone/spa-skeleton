<script>

    /**
     * This mixin is useful when the view needs to react to users filtering some data.
     *
     * Usage:
     *  1. Set the data that you want to filter in the `filterSubject` computed property.
     *  2. Set the `filter` method that will apply the filters on the subject.
     *
     * This mixin fires the `filter-completed` event on the event hub once the filtering is
     * complete.
     */
    export default {

        data ()
        {
            return {

                /**
                 * The filters that will be applied. Override in order to define the filters that
                 * will be applied.
                 */
                filters: {},

                /*
                 * Copy of the initial filters state. Will be used to determine whether the filters
                 * are clean or not.
                 */
                initialFiltersStatus: {},

                /*
                 * Filtering result.
                 */
                result: []
            }
        },

        computed: {

            /*
             * Whether a filtering has already been performed or not.
             */
            clean: {

                get ()
                {
                    return this.initialFiltersStatus === JSON.stringify(this.filters);
                },
                set () {}
            },

            filterSubject: {

                get ()
                {
                    return {};
                },
                set () {}
            }
        },

        methods: {

            /**
             * Apply the filters.
             */
            applyFilters ()
            {
                if (this.clean) {
                    this.result = this.filterSubject;
                    return;
                }

                this.result = this.filter(this.filterSubject);
            },

            /**
             * Override this function in order to specify what to do in order to filter the data.
             */
            filter ()
            {}
        },

        watch: {

            filters: {

                handler: function ()
                {
                    setTimeout(() =>
                    {
                        this.applyFilters();

                        this.clean = false;
                    }, 100)
                },
                deep: true
            },

            result ()
            {
                this.$eh.$emit('filter-completed', this.result);
            }
        },

        mounted ()
        {
            // Make a copy of the filters in their initial status.
            this.initialFiltersStatus = JSON.stringify(this.filters);
        }
    }

</script>
