<template>
    <v-btn v-bind="props" :loading="status === 'loading'" type="submit" :aria-label="ariaLabel"
           :disabled="disabled || status === 'loading'" v-on="this.$listeners"
           @click="internalOnClick">
        <slot/>
    </v-btn>
</template>

<script lang="ts">

import Button from '../Mixins/Button.vue';

export default {

    name: 'ButtonSubmit',

    mixins: [Button],

    props: {

        /**
         * On click callback action.
         *
         * This function should be a callback executor compatible function.
         */
        onClick: { type: Function, required: true } as () => Promise<any>
    },

    data() {
        return {
            /**
             * The button status. Accepted values are 'ready' and 'loading'.
             */
            status: 'ready' as 'ready' | 'loading',
            ariaLabel: ''
        }
    },

    computed: {
        props(): any
        {
            // Remove the `onClick` prop from the props passed to `v-btn`. This is required in order
            // to avoid the "Function statements require a function name" error.
            let props = { ...this.$props };
            delete props['onClick'];

            return props;
        }
    },

    methods: {
        /**
         * Handle the button click event.
         */
        async internalOnClick(): Promise<any>
        {
            this.status = 'loading';

            try {
                await this.onClick();
            } catch (error) {}

            this.status = 'ready';
        },

        /**
         * Add the Aria label to the button.
         */
        addAriaLabel(): void
        {
            let defaultSlot = this.$slots?.default;

            if (! defaultSlot) {
                return;
            }

            if (defaultSlot[0] && defaultSlot[0].text) {
                this.ariaLabel = defaultSlot[0].text.trim();
            }
        }
    },

    beforeMount(): void
    {
        this.addAriaLabel();
    }
}

</script>
