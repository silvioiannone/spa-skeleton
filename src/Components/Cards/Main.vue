<template>
    <v-card v-bind="$props" v-on="$listeners" :outlined="this._outlined">
        <v-card-title v-if="title.length || $scopedSlots.title" class="text-h5 d-flex"
                      style="flex-flow: row nowrap">
            <div class="flex-grow-1">
                <slot name="title" class="flex-grow-1">{{ title }}</slot>
            </div>
            <div class="flex-shrink-0 flex-grow-0 card__title__actions">
                <slot name="title-actions"/>
                <v-btn v-if="closable" icon @click="$emit('cancel')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
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

    import { Config } from 'spa-skeleton/src/Config';
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class CardMain extends Vue
    {
        /**
         * Display a close button.
         */
        @Prop({ type: Boolean }) closable: boolean;

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
        @Prop({ type: Boolean, default: undefined }) outlined: boolean;

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

        get _outlined(): boolean
        {
            if (this.outlined === undefined) {
                return Config.ui.components.card.defaultStyle === 'outlined';
            }

            return this.outlined;
        }
    }

    export default CardMain;

</script>
