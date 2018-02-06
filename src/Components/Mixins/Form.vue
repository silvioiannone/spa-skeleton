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

            _cancellable()
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
                this.$parent.$validator.reset();
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
                // Before submitting make sure that the form is valid.
                this.$parent.$validator
                    .validateAll()
                    .then(result =>
                    {
                        if (!result) {
                            reject();
                            return;
                        }

                        this.submit()
                            .then(response =>
                            {
                                this.$emit('submitted', response);
                                resolve();
                            })
                            .catch(error => {
                                this.$emit('error', error);
                                reject(error);
                            });
                    });
            }
        }
    }

</script>
