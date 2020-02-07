<template>
    <v-btn v-on="$listeners" :small="small" icon :value="value" :class="classes"
           :disabled="disabled">
        <v-icon :small="small">{{ icon }}</v-icon>
    </v-btn>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class ButtonToolbar extends Vue
    {
        /**
         * Display a smaller button.
         */
        @Prop({ type: Boolean, default: false }) small: boolean;

        /**
         * Button's value
         */
        @Prop({ type: Number, default: null }) value: number;

        /**
         * Icon displayed in the button.
         */
        @Prop({ type: String, default: '' }) icon: string;

        /**
         * Whether the button should be active.
         */
        @Prop({ type: Boolean, default: false }) active: boolean;

        /**
         * Whether the button is disabled.
         */
        @Prop({ type: Boolean, default: false }) disabled: boolean;

        get classes()
        {
            return {
                'v-btn--active': this.active
            }
        }
    }

    export default ButtonToolbar;

</script>
