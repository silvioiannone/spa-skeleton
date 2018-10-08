<script type="text/jsx">

    import MixinComponent from './Component.vue';

    /*
     * This mixin can be used in order to create new dialogs.
     */
    export default {

        mixins: [
            MixinComponent
        ],

        props: {

            /**
             * V-model. Determines the dialog visibility.
             */
            value: {
                type: Boolean,
                default: false
            },

            /**
             * Set the maximum width of the dialog.
             */
            maxWidth: {
                type: Number,
                default: 500
            },

            /**
             * The dialog will be persistent and that will prevent it from closing when clicking on
             * the backdrop.
             */
            persistent: {
                type: Boolean,
                default: false
            },

            /**
             * Display a fullscreen dialog.
             */
            fullscreen: {
                type: Boolean,
                default: false
            }
        },

        computed: {

            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },

            _fullscreen()
            {
                // Make the dialog fullscreen on small devices.
                return this.fullscreen || this.$vuetify.breakpoint.xs;
            },

            computedProps()
            {
                return {
                    fullscreen: this._fullscreen
                }
            }
        },

        methods: {

            /**
             * Close the dialog.
             */
            close()
            {
                this.model = false;
            },

            updateModel(value)
            {
                this.model = value;
            }
        },

        render(h)
        {
            return (
                <v-dialog value={this.value} onInput={this.updateModel} width={this.maxWidth}
                          fullscreen={this._fullscreen} persistent={this.persistent}>
                    {this._fullscreen &&
                        <v-btn class="dialog--button-close" icon onClick={this.close}>
                            <v-icon color="primary">close</v-icon>
                        </v-btn>
                    }
                    { this.$slots.default }
                </v-dialog>
            );
        }
    }

</script>
