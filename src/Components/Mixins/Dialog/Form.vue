<script>

    /*
     * This mixin adds some functionality to dialogs that are only supposed to display a form.
     */
    export default {

        props: {

            /**
             * Dialog's visibility.
             */
            value: {
                type: Boolean,
                default: true
            }
        },

        computed: {

            /**
             * Determines the dialog's visibility.
             */
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                    this.$emit('dialog-hidden');
                }
            }
        },

        watch: {

            value()
            {
                // If the dialog is displayed...
                if (this.value) {
                    // ... focus the first input.
                    this.$nextTick(() =>
                    {
                        document.querySelector('.dialog__content__active form input:first-child')
                            .focus();
                    });
                }
            }
        }
    }

</script>
