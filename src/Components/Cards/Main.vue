<template>
    <v-card v-bind="$props" v-on="$listeners">
        <v-card-title class="headline d-flex" v-if="title.length">
            <div class="flex-grow-1 flex-grow-0">{{ title }}</div>
            <div class="flex-shrink-1 flex-grow-0 card__title__actions">
                <slot name="title-actions"/>
            </div>
        </v-card-title>
        <v-card-subtitle v-if="subtitle.length">{{ subtitle }}</v-card-subtitle>
        <slot/>
        <v-card-actions v-if="$slots.actions">
            <slot name="actions"/>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class CardMain extends Vue
    {
        /**
         * Applies specified color to the control - it can be the name of material color (for
         * example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).
         */
        @Prop({ type: String, default: '' }) color: string;

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
         * Removes the card's elevation.
         */
        @Prop({ type: Boolean, default: false }) flat: boolean;

        /**
         * Removes the component's border-radius.
         */
        @Prop({ type: Boolean, default: false }) tile: boolean;

        /**
         * Card title.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * Card subtitle.
         */
        @Prop({ type: String, default: '' }) subtitle: string;
    }

    export default CardMain;

</script>
