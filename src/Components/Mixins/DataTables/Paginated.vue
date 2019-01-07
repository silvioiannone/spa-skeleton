<script lang="ts">

    import Vue           from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    /**
     * This mixin allows data tables to behave correctly when dealing with paginated data.
     *
     * It should be used by all tables that display paginated data.
     */
    @Component
    export default class Paginated extends Vue
    {
        /**
         * Pagination meta.
         */
        @Prop({ type: Object, required: true }) pagination: any;

        _pagination = {};

        created()
        {
            this.$data._pagination = {...this.pagination};

            this.$watch(
                () => this.$data._pagination,
                value => this.$emit('update:pagination', value)
            );
        }
    }

</script>
