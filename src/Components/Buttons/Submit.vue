<template>
    <v-btn :loading="status === 'loading'" :disabled="disabled || status === 'loading'"
           v-on="this.$listeners" :text="text" :color="color" :icon="icon"  @click="_onClick()"
           :large="large" type="submit" :aria-label="ariaLabel" :small="small">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">

    import { Button }            from '../Mixins/Button.vue';
    import { Component, Mixins } from 'vue-property-decorator';

    @Component
    export class ButtonSubmit extends Mixins(Button)
    {
        /**
         * The button status. Accepted values are 'ready' and 'loading'.
         */
        status: 'ready' | 'loading' = 'ready';

        ariaLabel: string = '';

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
