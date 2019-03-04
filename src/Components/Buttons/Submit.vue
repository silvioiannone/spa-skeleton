<template>
    <v-btn :loading="status === 'loading'" :disabled="disabled || status === 'loading'"
           :flat="flat" :color="color" :icon="icon"  @click="_onClick()" :large="large"
           type="submit">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">

    import Button                from '../Mixins/Button.vue';
    import { Component, Mixins } from 'vue-property-decorator';

    @Component
    export default class ButtonSubmit extends Mixins(Button)
    {
        /**
         * The button status. Accepted values are 'ready' and 'loading'.
         */
        status: 'ready' | 'loading' = 'ready';

        async _onClick(): Promise<any>
        {
            this.status = 'loading';

            try {
                await this.onClick();
            } catch (error) {}

            this.status = 'ready';
        }
    }

</script>
