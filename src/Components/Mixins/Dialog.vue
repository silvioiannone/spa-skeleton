<script lang="ts">

    import { VNode, CreateElement } from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import MixinComponent        from './Component.vue';

    /*
     * This mixin can be used in order to create new dialogs.
     */
    @Component
    export default class Dialog extends Mixins(MixinComponent)
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
        @Prop({ type: Boolean, default: false }) scrollable: Boolean;

        get _fullscreen()
        {
            // Make the dialog fullscreen on small devices.
            return this.fullscreen || this.$vuetify.breakpoint.xs;
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

        updateModel(value: boolean): void
        {
            this.model = value;
        }

        render(createElement: CreateElement): VNode
        {
            if (this._fullscreen) {
                let button = createElement('v-btn', {
                    class: {
                        'dialog--button-close': true
                    },
                    props: {
                        icon: true
                    },
                    on: {
                        click: this.close
                    }
                }, [
                    createElement('v-icon', {
                        props: {
                            color: 'primary'
                        }
                    }, 'close')
                ]);

                if (this.$slots.default) {
                    this.$slots.default.push(button);
                }
            }

            return createElement('v-dialog', {
                props: {
                    fullscreen: this._fullscreen,
                    persistent: this.persistent,
                    value: this.value,
                    width: this.maxWidth
                },
                on: {
                    input: this.updateModel
                }
            }, this.$slots.default)
        }
    }

</script>
