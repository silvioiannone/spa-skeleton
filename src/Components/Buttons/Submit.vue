<template>
    <v-btn :loading="status === 'loading'" :disabled="disabled || status === 'loading'"
           v-on="this.$listeners" :flat="flat" :color="color" :icon="icon"  @click="_onClick()"
           :large="large" type="submit" :aria-label="ariaLabel">
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

        beforeMount()
        {
            this.ariaLabel = this.$slots.default[0].text.trim();
        }
    }

    export default ButtonSubmit;

</script>
