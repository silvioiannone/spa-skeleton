<script lang="ts">

    import Vue from 'vue';

    /**
     * This mixin can be used to create base components.
     */
    export default Vue.extend({

        data()
        {
            return {
                // Use this in order to override the value of a prop.
                __props: {}
            }
        },

        computed: {

            /**
             * Use this computed prop in order to set props reactive default values.
             */
            computedProps(): any
            {
                return {};
            }
        },

        methods: {

            /**
             * Get the props.
             *
             * @returns {{}}
             */
            getProps(): any
            {
                // The merge priority is the following:
                // 1. Component props
                // 2. Computed props
                // 3. Data props

                return {
                    ...this.$props,
                    ...this.computedProps,
                    ...this.__props
                }
            },


            /**
             * Get the selected slot.
             */
            getSlot(slot: string): Array<any> | null
            {
                return this.$slots[slot] ? this.$slots[slot] : null
            }
        }
    });

</script>
