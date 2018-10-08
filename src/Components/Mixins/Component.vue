<script>

    /**
     * This mixin can be used to create base components.
     */
    export default {

        data()
        {
            return {
                // Use this in order to override the value of a prop.
                __props: {}
            }
        },

        computed: {

            /**
             * Use this prop in order to set props reactive default values.
             */
            computedProps()
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
            getProps()
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
             *
             * @param slot {String}
             * @return array|null
             */
            getSlot(slot)
            {
                return this.$slots[slot] ? this.$slots[slot] : null
            }
        }
    }

</script>
