<script>

    /*
     * This mixin can be used in order to create new forms.
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
             * Whether the buttons should be centered or not.
             */
            centerActions: {
                type: Boolean,
                default: false
            },

            /**
             * Submit action.
             *
             * It needs to be a function returning a promise.
             */
            submit: {
                type: [Function, Boolean],
                required: false,
                default: false
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
            },

            hasErrors()
            {
                // Don't consider the server errors not tied to a specific field.
                let serverErrorsCount = this.$parent.errors.all('_server').length;
                let totalCount = this.$parent.errors.all().length;

                return totalCount !== serverErrorsCount;
            },

            canSubmit()
            {
                return (typeof this.$parent.canSubmit !== 'undefined') ?
                    this.$parent.canSubmit : true;
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel()
            {
                this.$parent.$validator.reset();
                this.$emit('cancel')
            },

            /**
             * Handle the form submission.
             *
             * @param resolve
             * @param reject
             */
            handleSubmit()
            {
                return new Promise((resolve, reject) =>
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
                                    //this.$parent.$validator.pause();
                                    this.$emit('submitted', response);
                                    resolve(response);
                                })
                                .catch(error =>
                                {
                                    this.$emit('error', error);
                                    reject(error);
                                    throw error;
                                });
                        });
                });
            }
        }
    }

</script>
