<script>

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
             * Submit action.
             *
             * It needs to be a function returning a promise.
             */
            submit: {
                type: Function,
                required: true
            },

            /**
             * Text for the submit button.
             */
            submitText: {
                type: String,
                default: 'Submit'
            }
        },

        computed: {

            localCancellable()
            {
                return this.$parent.cancellable || this.cancellable;
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel()
            {
                this.$emit('cancelled')
            },

            /**
             * Handle the form submission.
             *
             * @param resolve
             * @param reject
             */
            handleSubmit(resolve, reject)
            {
                this.submit()
                    .then(() => {
                        this.$emit('submitted');
                        resolve();
                    })
                    .catch(error => reject(error));
            }
        }
    }

</script>
