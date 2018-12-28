<template>
    <v-btn :loading="status === 'loading'" :disabled="disabled || status === 'loading'"
           :flat="flat" :color="color" :icon="icon"  @click="_onClick()" type="submit">
        <slot></slot>
    </v-btn>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class ButtonSubmit extends Vue
    {
        /**
         * Whether the button is in a disabled state.
         */
        @Prop({ type: Boolean, default: false }) disabled: boolean;

        /**
         * On click callback action.
         *
         * This function should be a callback executor compatible function.
         */
        @Prop({ type: Function }) onClick: () => Promise<any>;

        /**
         * Button's color.
         */
        @Prop({ type: String }) color: string;

        /**
         * Display an icon button.
         */
        @Prop({ type: String }) icon: string;

        /**
         * Display a flat button.
         */
        @Prop({ type: Boolean, default: false }) flat: boolean;

        /**
         * The button status. Accepted values are 'ready' and 'loading'.
         */
        status: 'ready' | 'loading' = 'ready';

        _onClick()
        {
            let self = this;

            this.status = 'loading';

            this.onClick()
                .then(() =>
                {
                    self.status = 'ready';
                })
                .catch(() =>
                {
                    self.status = 'ready';
                });
        }
    }

</script>
