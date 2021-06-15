<template>
    <v-btn v-bind="props" :loading="status === 'loading'" type="submit" :aria-label="ariaLabel"
           :disabled="disabled || status === 'loading'" v-on="this.$listeners" @click="_onClick()">
        <slot/>
    </v-btn>
</template>

<script lang="ts">

    import { Prop } from 'vue-property-decorator';
    import Button from '../Mixins/Button.vue';
    import { Component, Mixins } from 'vue-property-decorator';

    @Component
    export class ButtonSubmit extends Mixins(Button)
    {
        /**
         * On click callback action.
         *
         * This function should be a callback executor compatible function.
         */
        @Prop({ type: Function, required: true }) onClick: () => Promise<any>;

        /**
         * The button status. Accepted values are 'ready' and 'loading'.
         */
        status: 'ready' | 'loading' = 'ready';

        ariaLabel: string = '';

        get props(): any
        {
            // Remove the `onClick` prop from the props passed to `v-btn`. This is required in order
            // to avoid the "Function statements require a function name" error.
            let props = { ...this.$props };
            delete props['onClick'];

            return props;
        }

        async _onClick(): Promise<any>
        {
            this.status = 'loading';

            try {
                await this.onClick();
            } catch (error) {}

            this.status = 'ready';
        }

        /**
         * Add the Aria label to the button.
         */
        addAriaLabel(): void
        {
            let slots = this.$slots;

            if (! slots) {
                return;
            }

            let defaultSlot = slots.default;

            if (defaultSlot && defaultSlot[0] && defaultSlot[0].text) {
                this.ariaLabel = defaultSlot[0].text.trim();
            }
        }

        beforeMount()
        {
            this.addAriaLabel();
        }
    }

    export default ButtonSubmit;

</script>
