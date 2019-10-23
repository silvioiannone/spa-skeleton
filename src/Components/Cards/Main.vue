<template>
    <v-card v-bind="$props" v-on="$listeners">
        <v-card-title class="headline" v-if="title.length">
            {{ title }}
            <v-spacer></v-spacer>
            <slot name="title-actions"></slot>
        </v-card-title>
        <slot></slot>
    </v-card>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class CardMain extends Vue
    {
        /**
         * Displays linear progress bar. Can either be a String which specifies which color is
         * applied to the progress bar (any material color or theme color - primary, secondary,
         * success, info, warning, error) or a Boolean which uses the component color (set by color
         * prop - if it's supported by the component) or the primary color.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Removes card elevation shadow and adds a thin border.
         */
        @Prop({ type: Boolean, default: false }) outlined: boolean;

        /**
         * Card title.
         */
        @Prop({ type: String, default: '' }) title: string;
    }

    export default CardMain;

</script>
