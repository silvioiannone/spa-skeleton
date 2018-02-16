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

                    if (! value) {
                        this.$emit('hidden');
                    }
                }
            }
        },

        methods: {

            /**
             * Focus the first input of the dialog.
             */
            focus()
            {
                this.$nextTick(() =>
                {
                    let firstFormInput = document
                        .querySelector('.dialog__content__active form input:first-child');

                    if (firstFormInput) {
                        firstFormInput.focus();
                    }
                });
            }
        },

        mounted()
        {
            if (this.value) {
                this.focus();
            }
        },

        watch: {

            value()
            {
                if (this.value) {
                    this.focus();
                }
            }
        }
    }

</script>
