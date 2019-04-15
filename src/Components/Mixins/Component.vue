<script lang="ts">

    import Vue, { VNode } from 'vue';
    import { Component }  from 'vue-property-decorator';

    @Component
    export class MixinComponent extends Vue
    {
        // Use this in order to override the value of a prop.
        __props = {};

        /**
         * Use this computed prop in order to set props reactive default values.
         */
        get computedProps(): any
        {
            return {};
        }

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
                ...this.$data.__props
            }
        }

        /**
         * Get the selected slot.
         */
        getSlot(slot: string): VNode[] | undefined
        {
            return this.$slots[slot];
        }
    }

    export default MixinComponent;

</script>
