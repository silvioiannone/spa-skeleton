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
            },

            /**
             * The form's subject.
             */
            subject: {
                type: Object,
                default: () => { return {} }
            }
        },

        data() {
            return {
                model: {}
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
                this.resetForm();
                this.$emit('submitted');
            },

            /**
             * Reset the form to its original state.
             */
            resetForm()
            {
                this.model = JSON.parse(JSON.stringify(this.subject));
            }
        },

        watch: {

            subject()
            {
                this.resetForm();
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

            this.resetForm();
        }
    }

</script>
