<script>

    /**
     * This mixin helps wrapping forms that are making use of the FormMain component.
     */
    export default {

        props: {

            /**
             * Whether or not the cancel button should be displayed.
             */
            cancellable: {
                type: Boolean,
                default: false
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel()
            {
                this.$emit('cancel');
            },

            /**
             * Fire the submitted event.
             */
            submitted()
            {
                this.$emit('submitted');
            }
        },

        mounted()
        {
            let self = this;

            // When the form-main emits a "cancelled" event...
            this.$children[0].$on('cancelled', () =>
            {
                self.cancel();
            });

            this.$children[0].$on('submitted', () =>
            {
                self.submitted();
            });
        }
    }

</script>
