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

        get _fullscreen()
        {
            // Make the dialog fullscreen on small devices.
            return this.fullscreen || this.$vuetify.breakpoint.xs;
        }

        get model() {
            return this.value;
        };

        set model(value: boolean) {
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

            //return (
            //    <v-dialog value={this.value} onInput={this.updateModel} width={this.maxWidth}
            //    fullscreen={this._fullscreen} persistent={this.persistent}>
            //    {this._fullscreen &&
            //            <v-btn class="dialog--button-close" icon onClick={this.close}>
            //            <v-icon color="primary">close</v-icon>
            //        </v-btn>
            //    }
            //    { this.$slots.default }
            //    </v-dialog>
            //);
        }
    }

</script>
