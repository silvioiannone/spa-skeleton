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

        data()
        {
            return {
                _vFormValid: true,
                _resetOnMount: true
            }
        },

        computed: {

            hasErrors()
            {
                return ! this.$data._vFormValid;
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
                    this.$validator.validateAll()
                        .then(result =>
                        {
                            if (!result) {
                                reject();
                                return;
                            }

                            this.submit()
                                .then(response =>
                                {
                                    this.resetForm();
                                    this.$emit('submit', response);
                                    resolve(response);
                                })
                                .catch(response =>
                                {
                                    this.$emit('error', response);
                                    console.error(response);
                                    this.handleErrors(response);
                                    reject(response);
                                });
                        });
                });
            },

            /**
             * Handle errors.
             *
             * @param response
             */
            handleErrors(response)
            {
                if (! response.body.errors) {
                    return;
                }

                // Assign the errors to the validator.
                for (let index in response.body.errors) {
                    // If the error's index is a number then it is a server error not linked to a
                    // form input.
                    let parsedIndex = parseInt(index);
                    if (!Number.isNaN(parsedIndex) && typeof parsedIndex === 'number') {
                        this.errors.add({
                            field: '_server',
                            msg: response.body.errors[index]['details'] ||
                                response.body.errors[index]['title'],
                            scope: '_server'
                        });
                    } else {
                        // These errors need to be set on the parent form because that's where the
                        // other components are located.
                        this.$parent.errors.add({
                            field: index,
                            msg: response.body.errors[index][0]
                        });
                        this.errors.add({
                            field: '_server',
                            msg: response.body.message,
                            scope: '_server'
                        });
                    }
                }
            },

            /**
             * Reset the form to its original state.
             */
            resetForm()
            {
                this.errors.clear();
                this.errors.clear('_server');

                if (this.$parent) {
                    this.$parent.errors.clear();
                    this.$parent.model = {...this.$parent.model, ...this.$parent.value};
                }
            }
        },

        created()
        {
            this.resetForm();
        },

        mounted()
        {
            // Whenever an input is focused we need to remove the server errors associated with it.
            this.$nextTick(() =>
            {
                this.$el.querySelectorAll('input, textarea')
                    .forEach(element => {
                    element.addEventListener('focusin', event =>
                    {
                        let field = event.target.getAttribute('name');
                        this.errors.remove(field, 'server');
                        this.$parent.errors.remove(field);
                    });
                });
            });
        },

        watch: {

            focus: {
                handler()
                {
                    if (! this.$el) {
                        return;
                    }

                    let firstInput = this.$el.querySelector('input');

                    if (firstInput) {
                        this.$nextTick(() =>
                        {
                            firstInput.focus();
                        });
                    }
                },
                immediate: true
            }
        }
    }

</script>
