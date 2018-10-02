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
             * Whether the buttons should be centered or not.
             */
            centerActions: {
                type: Boolean,
                default: false
            },

            /**
             * Whether the form should be focused.
             */
            focus: {
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
                model: {},

                _resetOnMount: true
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel()
            {
                this.resetForm();
                this.$emit('cancel');
            },

            /**
             * Fire the submitted event.
             */
            submitted(response)
            {
                this.resetForm();
                this.$emit('submitted', response);
            },

            /**
             * Fire the error event.
             */
            onError(response)
            {
                this.$emit('error', response);

                if (! response.body.errors) {
                    return;
                }

                // Assign the errors to the validator.
                for (let index in response.body.errors) {
                    // If the error's index is a number then it is a server error not linked to a
                    // form input.
                    let parsedIndex = parseInt(index);
                    if (! Number.isNaN(parsedIndex) && typeof parsedIndex === 'number') {
                        this.$validator.errors.add({
                            field: '_server',
                            msg: response.body.errors[index]['details'] ||
                                response.body.errors[index]['title'],
                            scope: '_server'
                        });
                    } else {
                        this.$validator.errors.add({
                            field: index,
                            msg: response.body.errors[index][0],
                            scope: 'server'
                        });
                        this.$validator.errors.add({
                            field: '_server',
                            msg: response.body.message,
                            scope: '_server'
                        });
                    }
                };
            },

            /**
             * Reset the form to its original state.
             */
            resetForm()
            {
                this.$validator.errors.clear();
                this.$validator.errors.clear('_server');
                let parentModel = this.$parent.model || {};
                this.model = Object.assign(parentModel, this.subject);
            }
        },

        watch: {

            focus()
            {
                if (this.focus) {
                    this.$el.querySelector('input').focus();
                }
            },

            subject()
            {
                this.resetForm();
            },

            model: {
                handler: () => {},
                deep: true
            }
        },

        mounted()
        {
            let self = this;

            // When the form-main emits a "cancelled" event...
            this.$children[0].$on('cancel', () =>
            {
                self.cancel();
            });

            this.$children[0].$on('submitted', response =>
            {
                self.submitted(response);
            });

            this.$children[0].$on('error', response =>
            {
                self.onError(response);
            });

            if (this.$data._resetOnMount) {
                this.resetForm();
            }

            if (this.focus) {
                let firstInput = this.$el.querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                }
            }

            // Whenever an input is focused we need to remove the server errors associated with it.
            this.$nextTick(() =>
            {
                this.$el.querySelectorAll('input').forEach(element => {
                    element.addEventListener('focusin', event =>
                    {
                        let field = event.target.getAttribute('name');
                        this.$validator.errors.remove(field, 'server');
                    });
                });
            });
        }
    }

</script>
