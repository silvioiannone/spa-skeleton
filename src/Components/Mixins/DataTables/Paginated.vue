<script>

    /**
     * This mixin allows data tables to behave correctly when dealing with paginated data.
     *
     * It should be used by all tables that display paginated data.
     */

    export default {

        props: {

            /**
             * Pagination meta.
             */
            pagination: {
                type: Object,
                required: true
            }
        },

        data()
        {
            return {
                _pagination: {}
            }
        },

        mounted()
        {
            this.$data._pagination = this.pagination;

            this.$watch(() => this.$data._pagination, value => this.$emit('update:pagination', value));
        }
    }

</script>
