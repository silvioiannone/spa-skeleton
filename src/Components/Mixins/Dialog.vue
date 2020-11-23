<script lang="ts">

    import { VNode, CreateElement }           from 'vue';
    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import { MixinComponent }                 from './Component.vue';

    /*
     * This mixin can be used in order to create new dialogs.
     */
    @Component
    export class Dialog extends Mixins(MixinComponent)
    {
        /**
         * V-model. Determines the dialog visibility.
         */
        @Prop({ type: Boolean, default: true }) value: boolean;

        /**
         * Set the maximum width of the dialog.
         */
        @Prop({ type: Number, default: 500 }) maxWidth: number;

        /**
         * The dialog will be persistent and that will prevent it from closing when clicking on
         * the backdrop.
         */
        @Prop({ type: Boolean, default: false }) persistent: boolean;

        /**
         * Display a fullscreen dialog.
         */
        @Prop({ type: Boolean, default: false }) fullscreen: boolean;

        /**
         * When set to true, expects a card, card-title, card-text and card-actions. Additionally,
         * card-text should have specified height. Will set card-text to overflow-y.
         */
        @Prop({ type: Boolean, default: false }) scrollable: boolean;

        /**
         * Hides the display of the overlay.
         */
        @Prop({ type: Boolean, default: false }) hideOverlay: boolean;

        /**
         * Sets the component transition. Can be one of the built in transitions or your own.
         */
        @Prop({ type: String, default: 'dialog-transition' }) transition: string;

        /**
         * Will force the components content to render on mounted. This is useful if you have
         * content that will not be rendered in the DOM that you want crawled for SEO.
         */
        @Prop({ type: Boolean, default: false }) eager: boolean;

        /**
         * Mark the dialog as closable.
         */
        @Prop({ type: Boolean, default: false }) closable: boolean;

        get _fullscreen()
        {
            // Make the dialog fullscreen on small devices.
            return this.fullscreen || this.$vuetify.breakpoint.xs;
        }

        get _closable()
        {

            return this.closable || this.$vuetify.breakpoint.smAndDown;
        }

        get model()
        {
            return this.value;
        }

        set model(value: boolean)
        {
            if (! value) {
                this.$emit('hidden');
            }

            this.$emit('input', value);
        }

        get computedProps()
        {
            return {
                fullscreen: this._fullscreen
            }
        }

        /**
         * Close the dialog.
         */
        close(): void
        {
            this.model = false;
        }

        /**
         * Update the model.
         */
        updateModel(value: boolean): void
        {
            this.model = value;
        }

        render(createElement: CreateElement): VNode
        {
            return createElement('v-dialog', {
                props: this.$props,
                on: {
                    input: this.updateModel
                }
            }, this.$slots.default)
        }

        @Watch('value')
        onValueChange()
        {
            this.$emit('input', this.value);
        }
    }

    export default Dialog;

</script>
